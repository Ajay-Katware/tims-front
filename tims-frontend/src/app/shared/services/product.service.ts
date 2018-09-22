import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToasterService } from './toaster.service';
import { RestApi } from '../api/rest-api';
import { Product } from '../models/product';

@Injectable()
export class ProductService {
  api = new RestApi();

  dataChange: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  get data(): Product[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllProducts(): void {
    this.httpClient.get<Product[]>(this.api.PRODUCT_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.api.PRODUCT_URL);
  }

  addProduct(product: Product): void {
    this.httpClient.post(this.api.PRODUCT_URL, product).subscribe(data => {
      this.dialogData = data;
        this.toasterService.openSuccessSnackBar('Successfully added', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 4000);
      });
  }

  deleteProduct(id: number): void {
    console.log(id);
    const url = `${this.api.PRODUCT_URL}/${id}`;
    this.httpClient.delete(url).subscribe(data => {
      this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  getProduct(id:number):Observable<Product>{
    const url = `${this.api.PRODUCT_URL}/${id}`;
    return this.httpClient.get<Product>(url);
  }

}
