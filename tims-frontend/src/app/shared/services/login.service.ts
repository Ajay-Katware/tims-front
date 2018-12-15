import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToasterService } from './toaster.service';
import { User } from '../models/user';
import { Observable } from 'rxjs/observable';
import { RestApi } from '../api/rest-api';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {

  api = new RestApi();
  user: User;
  private loggedIn = false;
  constructor(private httpClient: HttpClient,
    private toasterService: ToasterService) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  checkLogin(user: User): Observable<User> {
    return this.httpClient.post<User>(this.api.LOGIN_URL, user, httpOptions);
  }

  login(user: User) {
    return this.httpClient.post<User>(this.api.LOGIN_URL, user, httpOptions).map(data => {
      if (!data) {
        return;
      } else {
        this.user = data;
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('auth_token', JSON.stringify(data));
          localStorage.setItem("userid", this.user.id.toString());
          this.loggedIn = true;
          this.toasterService.openSuccessSnackBar('Login Successful', '', 2000)
        }
        return this.user;
        }
    });
  }

  updatePassword(id: number, pwd: string) {
    const url = `${this.api.UPDATEPWD_URL}/${id}`;
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let httpParams = new HttpParams()
      .set('password', pwd);
    console.log(httpParams.toString());
    console.log(httpHeaders.keys());
    return this.httpClient.get<User>(url, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }

  forgotPassword(email: string) {
    let httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    let httpParams = new HttpParams()
      .set('userEmail', email);
    console.log(httpParams.toString());
    console.log(httpHeaders.keys());
    return this.httpClient.get<User>(this.api.FORGOT_URL, {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }

  isAuthenticated() : boolean{
    return this.loggedIn;
  }

  logout() : boolean {
    localStorage.clear();
    localStorage.removeItem('auth_token');
    localStorage.removeItem("userid");
    this.loggedIn = false;
    this.toasterService.openSuccessSnackBar('Logout Successfully.', '', 2000)
    return this.loggedIn;
  }

}

