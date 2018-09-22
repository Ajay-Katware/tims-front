import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToasterService } from './toaster.service';
import { RestApi } from '../api/rest-api';
import { ProductItem } from '../models/product-item';

@Injectable()
export class ProductItemService {
  api = new RestApi();

  dataChange: BehaviorSubject<ProductItem[]> = new BehaviorSubject<ProductItem[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  get data(): ProductItem[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllProductItems(): void {
    this.httpClient.get<ProductItem[]>(this.api.PRODUCTITEM_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getProductItems(): Observable<ProductItem[]> {
    return this.httpClient.get<ProductItem[]>(this.api.PRODUCTITEM_URL);
  }

  addProductItem(productItem: ProductItem): void {
    this.httpClient.post(this.api.PRODUCTITEM_URL, productItem).subscribe(data => {
      console.log("========================================="+JSON.stringify(data));
      this.dialogData = data;
      this.toasterService.openSuccessSnackBar('Successfully added', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 4000);
      });
  }

  deleteProductItem(id: number): void {
    console.log(id);
    const url = `${this.api.PRODUCTITEM_URL}/${id}`;
    this.httpClient.delete(url).subscribe(data => {
      this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }

  getProductItem(id: number): Observable<ProductItem> {
    const url = `${this.api.PRODUCTITEM_URL}/${id}`;
    return this.httpClient.get<ProductItem>(url);
  }

}
