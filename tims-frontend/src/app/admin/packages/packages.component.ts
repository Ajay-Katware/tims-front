import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatPaginator, MatSort, MatMenuTrigger } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk/collections';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { Router } from '@angular/router';
import { ToasterService } from '../../shared/services/toaster.service';
import { PackageOrderService } from '../../shared/services/package-order.service';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { PackageOrder } from '../../shared/models/package-order';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent implements OnInit {

  displayedColumns = ['packagedate', 'packageno','salesorderno', 'customername', 'totalqty', 'status', 'actions'];
  exampleDatabase: PackageOrderService | null;
  dataSource: ExampleDataSource | null;
  id: number;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public packageOrderService: PackageOrderService,
    private router: Router,
    private toasterService: ToasterService) { }

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
    this.exampleDatabase = new PackageOrderService(this.httpClient, this.toasterService);
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

  private refreshTable() {
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  deleteItem(i: number, id: number) {
    this.id = id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: id, type: "packageOrder" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.id === this.id);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  viewSalesOrder(id: number) {
    this.router.navigateByUrl("/admin/products/view/" + id);
  }

  viewPackage(id:number){

  }

  createshipment(id:number){
    this.router.navigateByUrl("/admin/packages/createshipment/"+ id);
  }

}

export class ExampleDataSource extends DataSource<PackageOrder> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: PackageOrder[] = [];
  renderedData: PackageOrder[] = [];

  constructor(public _exampleDatabase: PackageOrderService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<PackageOrder[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getTable();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((packageOrder: PackageOrder) => {
        const searchStr = (packageOrder.id + packageOrder.salesorderid.salesorderno + packageOrder.packageno + packageOrder.packagedate + packageOrder.delivered).toLowerCase();
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
  sortData(data: PackageOrder[]): PackageOrder[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | Date= '';
      let propertyB: number | string | Date = '';

      switch (this._sort.active) {
        case 'salesorderno': [propertyA, propertyB] = [a.salesorderid.salesorderno, b.salesorderid.salesorderno]; break;
        case 'packageno': [propertyA, propertyB] = [a.packageno, b.packageno]; break;
        case 'packagedate': [propertyA, propertyB] = [a.packagedate, b.packagedate]; break;
        case 'totalqty': [propertyA, propertyB] = [a.totalqty, b.totalqty]; break;
        case 'delivered': [propertyA, propertyB] = [a.delivered, b.delivered]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
