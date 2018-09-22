import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PermissionsService } from '../../shared/services/permissions.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort } from '@angular/material';
import { Permissions } from '../../shared/models/permissions';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { AddPermissionDailogComponent } from './add-permission-dailog/add-permission-dailog.component';
import { EditPermissionDialogComponent } from './edit-permission-dialog/edit-permission-dialog.component';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {

  displayedColumns = ['name', 'description', 'actions'];
  exampleDatabase: PermissionsService | null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  name: string;

  title: string = 'Confirm Dialog';
  text: string = 'Just click a button!';
  selected: string;

  loaderText: string = 'Please wait';
  loadingTime: number = 3000;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public permissionsService: PermissionsService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

 addPermissionDialog(permissions:Permissions): void {
   console.log(permissions);
    let dialogRef = this.dialog.open(AddPermissionDailogComponent, {
      width: '350px',
      data: { permissions }
     });

     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       if(result == 1){
        this.exampleDatabase.dataChange.value.push(this.permissionsService.getDialogData());
        this.refreshTable();
      }
     });
   }

   startEdit(i: number, id: number, name: string, description: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditPermissionDialogComponent, {
      width: '350px',
      data: {id: id, name: name, description: description}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.permissionsService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, type:string) {
    console.log("--------"+i+"------"+id+"------"+title+"------"+type);
    this.index = i;
     this.title = title;
     this.id = id;
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       width: '350px',
       data: {id: id, title: title, type:type}
    });

    dialogRef.afterClosed().subscribe(result => {
       console.log("----Result----"+result);
      if (result) {
         const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
         this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
   });
   }

  public loadData() {
    this.exampleDatabase = new PermissionsService(this.httpClient);
    this.dataSource = new ExampleDataSource(this.exampleDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  // If you don't need a filter or a pagination this can be simplified, you just use code from else block
  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

}

export class ExampleDataSource extends DataSource<Permissions> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Permissions[] = [];
  renderedData: Permissions[] = [];

  constructor(public _exampleDatabase: PermissionsService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Permissions[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllPermissions();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((roleObj: Permissions) => {
        if(roleObj.id!=null){
          const searchStr = (roleObj.id + roleObj.name + roleObj.description).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        }else{
          const searchStr = (roleObj.name + roleObj.description).toLowerCase();
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        }
        
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  sortData(data: Permissions[]): Permissions[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

