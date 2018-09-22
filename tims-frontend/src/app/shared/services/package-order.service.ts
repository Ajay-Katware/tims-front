import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from '../../../../node_modules/rxjs';
import { RestApi } from '../api/rest-api';
import { HttpClient, HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { ToasterService } from './toaster.service';
import { PackageOrder } from '../models/package-order';
import { AutoNumber } from '../models/auto-number';

@Injectable({
  providedIn: 'root'
})
export class PackageOrderService {
  api = new RestApi();

  dataChange: BehaviorSubject<PackageOrder[]> = new BehaviorSubject<PackageOrder[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  get data(): PackageOrder[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getTable(): void {
    this.httpClient.get<PackageOrder[]>(this.api.PACKAGEORDER_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getList(): Observable<PackageOrder[]> {
    return this.httpClient.get<PackageOrder[]>(this.api.PACKAGEORDER_URL);
  }

  getPackage(id:number): Observable<PackageOrder> {
    const url = `${this.api.PACKAGEORDER_URL}/${id}`;
    return this.httpClient.get<PackageOrder>(url);
  }

  getNextPackageNumber(): Observable<AutoNumber> {
    return this.httpClient.get<AutoNumber>(this.api.NEXTPKGNUMBER_URL);
  }

  getNextShipmentNumber(): Observable<AutoNumber> {
    return this.httpClient.get<AutoNumber>(this.api.NEXTSHIPNUMBER_URL);
  }

  create(packageOrder: PackageOrder): void {
    this.httpClient.post(this.api.PACKAGEORDER_URL, packageOrder).subscribe(data => {
      this.dialogData = data;
      if (packageOrder.id != null && packageOrder.id > 0) {
        this.toasterService.openSuccessSnackBar('Successfully updated', '', 2000);
      } else {
        this.toasterService.openSuccessSnackBar('Successfully added', '', 2000);
      }
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      });
  }

  remove(id: number): void {
    const url = `${this.api.PACKAGEORDER_URL}/${id}`;

    this.httpClient.delete(url).subscribe(data => {
      this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      }
    );
  }
}
