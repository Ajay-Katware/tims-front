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
import { SalesOrdersService } from '../../shared/services/sales-orders.service';
import { Router } from '@angular/router';
import { ToasterService } from '../../shared/services/toaster.service';
import { SalesOrder } from '../../shared/models/sales-order';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {
  
  displayedColumns = ['orderdate', 'invoiceno', 'customername', 'salesorderno', 'reference', 'amount', 'actions'];
  exampleDatabase: SalesOrdersService | null;
  dataSource: ExampleDataSource | null;
  id: number;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public salesOrdersService: SalesOrdersService,
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
    this.exampleDatabase = new SalesOrdersService(this.httpClient, this.toasterService);
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

  deleteItem(id: number) {
    this.id = id;
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: id, type: "salesorder" }
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
    this.router.navigateByUrl("/admin/salesorders/view/" + id);
  }

  editSalesOrder(id: number): void {
    this.router.navigate(['/admin/salesorders/edit'], { queryParams: { id: id } });
  }

  emergencymail(salesOrder:SalesOrder){

  }

  printInvoice(id:number){
    this.router.navigate(['/admin/invoices/printinvoice'], { queryParams: { id: id } });
  }

}

export class ExampleDataSource extends DataSource<SalesOrder> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: SalesOrder[] = [];
  renderedData: SalesOrder[] = [];

  constructor(public _exampleDatabase: SalesOrdersService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<SalesOrder[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._exampleDatabase.getAllInvoices();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
      this.filteredData = this._exampleDatabase.data.slice().filter((salesOrder: SalesOrder) => {
        const searchStr = (salesOrder.id + salesOrder.salesorderno + salesOrder.reference + salesOrder.customerid.firstname).toLowerCase();
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
  sortData(data: SalesOrder[]): SalesOrder[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | Date = '';
      let propertyB: number | string | Date = '';

      switch (this._sort.active) {
        case 'salesorderno': [propertyA, propertyB] = [a.salesorderno, b.salesorderno]; break;
        case 'reference': [propertyA, propertyB] = [a.reference, b.reference]; break;
        case 'orderdate': [propertyA, propertyB] = [a.orderdate, b.orderdate]; break;
        case 'expecteddate': [propertyA, propertyB] = [a.expecteddate, b.expecteddate]; break;
        case 'salesperson': [propertyA, propertyB] = [a.salesperson, b.salesperson]; break;
        case 'total': [propertyA, propertyB] = [a.total, b.total]; break;
        case 'status': [propertyA, propertyB] = [a.status, b.status]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

