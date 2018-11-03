import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/observable';


import { User } from '../models/user';
import { ToasterService } from './toaster.service';
import { RestApi } from '../api/rest-api';

@Injectable()
export class UserService {
  api = new RestApi();

  dataChange: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;

  constructor(private httpClient: HttpClient, private toasterService: ToasterService) { }

  get data(): User[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllUsers(): void {
    this.httpClient.get<User[]>(this.api.USER_URL).subscribe(data => {
      this.dataChange.next(data);
    },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      });
  }

  checkUserByUsername(username: string): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let httpParams = new HttpParams()
      .set('username', username);
    console.log(httpParams.toString());
    console.log(httpHeaders.keys());
    return this.httpClient.get<boolean>(this.api.CHECKUSERBYUSERNAME_URL, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }

  checkUserByUseremail(userEmail: string): Observable<boolean> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let httpParams = new HttpParams()
      .set('userEmail', userEmail);
    console.log(httpParams.toString());
    console.log(httpHeaders.keys());
    return this.httpClient.get<boolean>(this.api.CHECKUSERBYEMAIL_URL, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }

  addUser(user: User, selectedFile: File): void {
    this.httpClient.post(this.api.USER_URL, user).subscribe(data => {
      this.dialogData = data;
      if (this.dialogData !== null && this.dialogData.id > 0 ) {
        this.uploadImage(this.dialogData.id, selectedFile);
      }
      if (user.id != null && user.id > 0) {
        this.toasterService.openSuccessSnackBar('Successfully updated', '', 2000);
      } else {
        this.toasterService.openSuccessSnackBar('Successfully added', '', 2000);
      }
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      });
  }

  uploadImage(id: number, selectedFile: File) {
    const url = `${this.api.USER_IMAGE_URL}/${id}`;
    if (selectedFile !== null) {
      const fd = new FormData();
      fd.append("file", selectedFile, selectedFile.name);
      this.httpClient.post(url, fd).subscribe(result => {
        if (!result) {
          return;
        } else {
        }
      });
    }
  }

  deleteUser(id: number): void {
    const url = `${this.api.USER_URL}/${id}`;

    this.httpClient.delete(url).subscribe(data => {
      console.log(data['']);
      this.toasterService.openSuccessSnackBar('Successfully deleted', 'ok', 1000);
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      }
    );
  }

  getUser(id: number): Observable<User> {
    console.log("user" + id);
    const url = `${this.api.USER_URL}/${id}`;
    return this.httpClient.get<User>(url);
  }

  update(profile: User): void {
    this.httpClient.post(this.api.USER_URL, profile).subscribe(data => {
      if (!data) {
        return;
      } else {
        this.toasterService.openSuccessSnackBar('Successfully updated', '', 2000);
      }
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      });
  }

  checkUserByResetToken(resetToken: string): Observable<User> {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let httpParams = new HttpParams()
      .set('resetToken', resetToken);
    return this.httpClient.get<User>(this.api.CHECKUSERBYTOKEN_URL, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }

  
  addNewPassword(user: User): Observable<User> {
    return this.httpClient.post<User>(this.api.SETPWD_URL, user);
  }

}
