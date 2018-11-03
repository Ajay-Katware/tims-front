import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { AdduserDialogComponent } from './adduser-dialog/adduser-dialog.component';
import { Role } from '../../shared/models/role';
import { ToasterService } from '../../shared/services/toaster.service';
import { Router } from '@angular/router';
import { GenericTerm } from '../Generic/generic-term';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  generic = new GenericTerm();
  displayedColumns = ['profilepic', 'name','useremail', 'contactno', 'userrole', 'actions'];
  exampleDatabase: UserService| null;
  dataSource: ExampleDataSource | null;
  role:Role[];

  index: number;
  id:number;
  name: string;
  title:string;
  loggedUser:string;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public userService: UserService,
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

  public loadData() {
    this.exampleDatabase = new UserService(this.httpClient, this.toasterService);
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

  addNew(): void {
     let dialogRef = this.dialog.open(AdduserDialogComponent, {
       data: { user:null }
      });
 
      dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed'+result);
        if(result){
         this.exampleDatabase.dataChange.value.push(this.userService.getDialogData());
         this.refreshTable();
         this.refresh();
       }
      });
    }

    startEdit(i:number, id:number, firstname:string, lastname:string, useremail:string, username:string, streetno:string, streetname:string, city:string, postalcode:string, country:string, province:string, contactno:string, gender:string, userrole:Role){
      this.name = useremail;
      let dialogRef = this.dialog.open(AdduserDialogComponent, {
        data: { id:id, firstname:firstname, lastname:lastname, useremail:useremail, username:username, streetno:streetno ,streetname:streetname, city:city, postalcode:postalcode, country:country, province:province,contactno:contactno,gender:gender, userrole:userrole}
       });
  
       dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed'+result);
         if(result){
          // When using an edit things are little different, firstly we find record inside DataService by id
          console.log(this.name);
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.useremail === this.name);
          console.log(foundIndex);
          // Then you update that record using data from dialogData (values you enetered)
          this.exampleDatabase.dataChange.value[foundIndex] = this.userService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.refresh();
        }
       });
    }

    // viewUser(user:User){
    //   let dialogRef = this.dialog.open(ViewuserDailogComponent, {
    //     data: { id:user.id, firstname:user.firstname, lastname:user.lastname, useremail:user.useremail, username:user.username, streetno:user.streetno ,streetname:user.streetname, city:user.city, postalcode:user.postalcode, country:user.country, province:user.province,contactno:user.contactno,gender:user.gender}
    //    });
  
    //    dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed'+result);
    //    });
    // }
    viewUser(user:User){

    }
  

  deleteItem(i: number, id:number, name: string, title: string, type:string) {
    console.log("--------"+i+"------"+name+"------"+title);
    this.index = i;
    this.title = title;
    this.name = name;
    this.id =id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {id:id, name: name, title: title, type:type}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
        this.refresh();
      }
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

export class ExampleDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _exampleDatabase: UserService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<User[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllUsers();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((user: User) => {
        const searchStr = (user.firstname + user.lastname + user.useremail+user.contactno).toLowerCase();
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
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'firstname': [propertyA, propertyB] = [a.firstname, b.firstname]; break;
        case 'lastname': [propertyA, propertyB] = [a.lastname, b.lastname]; break;
        case 'useremail': [propertyA, propertyB] = [a.useremail, b.useremail]; break;
        case 'contactno': [propertyA, propertyB] = [a.contactno, b.contactno]; break;
        //case 'userrole': [propertyA, propertyB] = [a.userrole., b.userrole]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
