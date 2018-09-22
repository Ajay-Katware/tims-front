import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Permissions } from '../models/permissions';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { ToasterService } from './toaster.service';

@Injectable()
export class PermissionsService {
  private toasterService:ToasterService;
  private readonly API_URL = 'http://localhost:8080/permission';

  dataChange: BehaviorSubject<Permissions[]> = new BehaviorSubject<Permissions[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient) { }

  get data(): Permissions[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllPermissions(): void {
    this.httpClient.get<Permissions[]>(this.API_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  addPermission(role: Permissions): void {
    console.log(role);
    //this.dialogData = role;
    this.httpClient.post(this.API_URL, role).subscribe(data => {
      // if(!data){
      //     return;
      // }
      this.dialogData = role;
      console.log(this.dialogData);
      //   //this.toasterService.showToaster('Successfully added', 3000);
    },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      });
  }

  // UPDATE, PUT METHOD
  updateItem(permissionObj: Permissions): void {
    console.log("Update"+permissionObj);
    const url = `${this.API_URL}/${permissionObj.id}`;
    this.httpClient.put(url, permissionObj).subscribe(data => {
        this.dialogData = permissionObj;
        //this.toasterService.showToaster('Successfully edited', 3000);
      },
      (err: HttpErrorResponse) => {
       // this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


  deletePermission(id: number): void {
    console.log("permission"+id);
    const url = `${this.API_URL}/${id}`;
    
    this.httpClient.delete(url).subscribe(data => {
      console.log(data['']);
        this.toasterService.showToaster('Successfully deleted','ok', 3000);
      },
      (err: HttpErrorResponse) => {
        //this.toasterService.showToaster('Error occurred. Details: ' + err.name + ' ' + err.message, 8000);
      }
    );
  }


}
