import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToasterService } from './toaster.service';
import { RestApi } from '../api/rest-api';
import { SalesOrder } from '../models/sales-order';
import { SalesOrderDto } from '../models/sales-order-dto';
import { AutoNumber } from '../models/auto-number';

@Injectable()
export class SalesOrdersService {

  api = new RestApi();

  dataChange: BehaviorSubject<SalesOrder[]> = new BehaviorSubject<SalesOrder[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  get data(): SalesOrder[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllSalesOrders(): void {
    this.httpClient.get<SalesOrder[]>(this.api.SALESORDER_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getAllInvoices(): void {
    this.httpClient.get<SalesOrder[]>(this.api.INVOICES_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getSalesOrders(): Observable<SalesOrder[]> {
    return this.httpClient.get<SalesOrder[]>(this.api.SALESORDER_URL);
  }

  getInvoices(): Observable<SalesOrder[]> {
    return this.httpClient.get<SalesOrder[]>(this.api.INVOICES_URL);
  }

  getNextSONumber(): Observable<AutoNumber> {
    return this.httpClient.get<AutoNumber>(this.api.NEXTSONUMBER_URL);
  }

  getNextInvoiceNumber(): Observable<AutoNumber> {
    return this.httpClient.get<AutoNumber>(this.api.NEXTINVNUMBER_URL);
  }

  addSalesOrder(salesOrderDto: SalesOrderDto): void {
    this.httpClient.post(this.api.SALESORDER_URL, salesOrderDto).subscribe(data => {
      this.dialogData = data;
      this.toasterService.openSuccessSnackBar('Successfully added', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 4000);
      });
  }

  createInvoice(id: number, invoiceno: string) : Observable<boolean>{
    const url = `${this.api.CREATEINVOICE_URL}/${id}`;
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let httpParams = new HttpParams()
      .set('invoiceno', invoiceno);
    return this.httpClient.get<boolean>(url, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }

  remove(id: number): void {
    const url = `${this.api.SALESORDER_URL}/${id}`;
    this.httpClient.delete(url).subscribe(data => {
      this.toasterService.openSuccessSnackBar('Successfully deleted', 'Ok', 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openSuccessSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, 'Ok', 8000);
      }
    );
  }

  getSalesOrder(id: number): Observable<SalesOrder> {
    const url = `${this.api.SALESORDER_URL}/${id}`;
    return this.httpClient.get<SalesOrder>(url);
  }
}
