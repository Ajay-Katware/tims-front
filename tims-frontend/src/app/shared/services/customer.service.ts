import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { RestApi } from '../api/rest-api';
import { Customer } from '../models/customer';
import { ToasterService } from './toaster.service';

@Injectable()
export class CustomerService {
  api = new RestApi();

  dataChange: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  get data(): Customer[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllCustomers(): void {
    this.httpClient.get<Customer[]>(this.api.CUSTOMER_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getCustomerList():Observable<Customer[]>{
    return this.httpClient.get<Customer[]>(this.api.CUSTOMER_URL);
  }

  addCustomer(customer: Customer): void {
    this.httpClient.post(this.api.CUSTOMER_URL, customer).subscribe(data => {
      this.dialogData = data;
      if (customer.id != null && customer.id > 0) {
        this.toasterService.openSuccessSnackBar('Successfully updated', '', 2000);
      } else {
        this.toasterService.openSuccessSnackBar('Successfully added', '', 2000);
      }
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      });
  }

  deleteCustomer(id: number): void {
    console.log("user" + id);
    const url = `${this.api.CUSTOMER_URL}/${id}`;

    this.httpClient.delete(url).subscribe(data => {
      console.log(data['']);
      this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      }
    );
  }

  getCustomer(id: number): Observable<Customer> {
    const url = `${this.api.CUSTOMER_URL}/${id}`;
    return this.httpClient.get<Customer>(url);
  }

}
