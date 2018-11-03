import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { TimsException } from '../../shared/models/tims-exception';
import { ToasterService } from '../../shared/services/toaster.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  user = new User();
  errorMessage: string;
  loggedUser: boolean = false;
  expError: TimsException;
  constructor(private loginService: LoginService, private router: Router, private toasterService:ToasterService) { }

  ngOnInit() {
    this.isValidUser();
  }

  isValidUser() {
    this.loggedUser = this.loginService.isAuthenticated();
    if (this.loggedUser) {
      this.router.navigateByUrl("/admin/dashboard");
    } else {
      this.router.navigateByUrl("/sessions/signin");
    }
  }

  onSubmit() {
    this.submitted = true;
    this.loginService.login(this.user).subscribe(data => {
      if (!data) {
        return;
      } else {
        this.user = data;
        if (typeof (Storage) !== "undefined") {
          localStorage.setItem('auth_token', JSON.stringify(data));
          localStorage.setItem("userid", this.user.id.toString());
          this.toasterService.openSuccessSnackBar('Login Successful', '', 2000)
        }
        if (this.user != null) {
          this.router.navigateByUrl("/admin/dashboard");
        } else {
          this.errorMessage = "Invalid";
        }
      }
    },
      error => {
        this.expError = error.error;
        this.errorMessage = this.expError.errorMessage;
      });
  }
}
