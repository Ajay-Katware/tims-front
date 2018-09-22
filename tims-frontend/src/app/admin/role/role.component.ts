import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatMenuTrigger} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/models/role';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { EditRoleDialogComponent } from './edit-role-dialog/edit-role-dialog.component';
import { ToasterService } from '../../shared/services/toaster.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RoleComponent implements OnInit {

  displayedColumns = ['role', 'description', 'actions'];
  exampleDatabase: RoleService| null;
  dataSource: ExampleDataSource | null;
  index: number;
  id: number;
  name:string; 
  loggedUser:string;
  tempObj = new Role();

  isCopied1: boolean = false;

  title: string = 'Confirm Dialog';
  @ViewChild(MatMenuTrigger) contextMenu: MatMenuTrigger;

  openContextMenu(event, roleObj:Role) {
    console.log("--------------"+JSON.stringify(roleObj));
    this.tempObj = roleObj;
    event.preventDefault(); // Suppress the browser's context menu
    this.contextMenu.openMenu(); // Open your custom context menu instead
  }

  isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
  expandedElement: any;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public roleService: RoleService,
    private router:Router,
    private toasterService:ToasterService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  addRoleDialog(): void {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
      data: { role : null }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result == 1){
        this.exampleDatabase.dataChange.value.push(this.roleService.getDialogData());
        this.refreshTable();
      }
    });
  }

  copyRole():void{
    this.id = -1;
    this.name = this.tempObj.role;
    this.title = this.tempObj.description;
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
      data: {id: 0, role: this.name, description: this.title, type:"copy"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        console.log("COPY"+result);
        this.exampleDatabase.dataChange.value.push(this.roleService.getDialogData());
        this.refreshTable();
      }
    });
  }

  deleteRole():void{
    this.title = this.tempObj.role;
    this.id = this.tempObj.id;
    this.name= "role";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {id: this.id, title: this.title, type:this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("----Result----"+result);
      if (result) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.role === this.title);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  editRole():void{
    this.id = this.tempObj.id;
    this.name = this.tempObj.role;
    this.title = this.tempObj.description;
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
      data: {id: this.id, role: this.name, description: this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result is:"+result)
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.role === this.name);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.roleService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  viewRole(roleObj : Role):void{
    this.id = roleObj.id;
    this.name = roleObj.role;
    this.title = roleObj.description;
    const dialogRef = this.dialog.open(EditRoleDialogComponent, {
      width: '350px',
      data: {id: this.id, role: this.name, description: this.title}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result is:"+result)
    });
  }

  startEdit(id: number, role: string, description: string) {
    this.name = role;
    // index row is used just for debugging proposes and can be removed
    const dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
      data: {id: id, role: role, description: description}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result is:"+result)
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.role === this.name);
        // Then you update that record using data from dialogData (values you enetered)
        this.exampleDatabase.dataChange.value[foundIndex] = this.roleService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, title: string, type:string) {
    console.log("--------"+i+"------"+id+"------"+title);
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
    this.exampleDatabase = new RoleService(this.httpClient, this.toasterService);
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

export class ExampleDataSource extends DataSource<Role> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Role[] = [];
  renderedData: Role[] = [];

  constructor(public _exampleDatabase: RoleService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Role[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllRoles();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((roleObj: Role) => {
        if(!roleObj){
          return;
        }
        const searchStr = (roleObj.role + roleObj.description).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
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
  sortData(data: Role[]): Role[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'role': [propertyA, propertyB] = [a.role, b.role]; break;
        case 'description': [propertyA, propertyB] = [a.description, b.description]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
