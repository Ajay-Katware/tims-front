import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from '../../../../node_modules/rxjs';
import { RestApi } from '../api/rest-api';
import { HttpClient, HttpErrorResponse } from '../../../../node_modules/@angular/common/http';
import { ToasterService } from './toaster.service';
import { PackageItem } from '../models/package-item';

@Injectable({
  providedIn: 'root'
})
export class PackageItemService {
  api = new RestApi();

  dataChange: BehaviorSubject<PackageItem[]> = new BehaviorSubject<PackageItem[]>([]);
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  get data(): PackageItem[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getTable(): void {
    const profileid = +localStorage.getItem("profileid");
    const url = `${this.api.PACKAGEITEM_URL}/${profileid}`;
    this.httpClient.get<PackageItem[]>(url).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  getList(): Observable<PackageItem[]> {
    const profileid = +localStorage.getItem("profileid");
    const url = `${this.api.PACKAGEITEM_URL}/${profileid}`;
    return this.httpClient.get<PackageItem[]>(url);
  }

  create(PackageItem: PackageItem): void {
    this.httpClient.post(this.api.PACKAGEITEM_URL, PackageItem).subscribe(data => {
      this.dialogData = data;
      if (PackageItem.id != null && PackageItem.id > 0) {
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
    const url = `${this.api.PACKAGEITEM_URL}/${id}`;

    this.httpClient.delete(url).subscribe(data => {
      this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      }
    );
  }
}
