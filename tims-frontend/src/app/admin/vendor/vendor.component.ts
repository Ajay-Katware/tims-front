import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort} from '@angular/material';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {DataSource} from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ToasterService } from '../../shared/services/toaster.service';
import { Vendor } from '../../shared/models/vendor';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { VendorService } from '../../shared/services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  displayedColumns = ['name', 'emailid', 'contactno', 'address', 'actions'];
  exampleDatabase: VendorService| null;
  dataSource: ExampleDataSource | null;

  index: number;
  id:number;
  name: string;
  title:string;
  loggedUser:string;
 

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public vendorService: VendorService,
    private router:Router,
    private toasterService:ToasterService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
    this.refresh();
  }

  refresh() {
    this.loadData();
  }

  public loadData() {
    this.exampleDatabase = new VendorService(this.httpClient, this.toasterService);
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

  viewVendor(id: number) {
    this.router.navigateByUrl("/admin/customers/view/" + id);
  }

  editVendor(id:number):void{
    this.router.navigateByUrl("/admin/vendors/edit/"+id);
  }

  deleteVendor(id:number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: id, type:"vendor" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
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

export class ExampleDataSource extends DataSource<Vendor> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Vendor[] = [];
  renderedData: Vendor[] = [];

  constructor(public _exampleDatabase: VendorService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the customer changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Vendor[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllVendors();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((customer: Vendor) => {
        const searchStr = (customer.firstname + customer.lastname + customer.emailid + customer.contactno).toLowerCase();
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
  sortData(data: Vendor[]): Vendor[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'firstname': [propertyA, propertyB] = [a.firstname, b.firstname]; break;
        case 'lastname': [propertyA, propertyB] = [a.lastname, b.lastname]; break;
        case 'emailid': [propertyA, propertyB] = [a.emailid, b.emailid]; break;
        case 'contactno': [propertyA, propertyB] = [a.contactno, b.contactno]; break;
        //case 'userrole': [propertyA, propertyB] = [a.userrole., b.userrole]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

