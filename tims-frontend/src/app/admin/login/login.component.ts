import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { TimsException } from '../../shared/models/tims-exception';


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
  isLoadingResults: boolean = false;

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

  constructor(private themeService: ThemeService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.isValidUser();
  }

  isValidUser() {
    this.loggedUser = this.loginService.isAuthenticated();
    if (this.loggedUser) {
      this.router.navigateByUrl("/admin/dashboard");
    } else {
      this.router.navigateByUrl("/admin/login");
    }
  }

  onSubmit() {
    this.submitted = true;
    this.isLoadingResults = true;
    this.loginService.login(this.user).subscribe(data => {
      this.user = data;
      if (this.user != null) {
        this.router.navigateByUrl("/admin/dashboard");
      } else {
        this.errorMessage = "Invalid";
      }
      this.isLoadingResults = false;
      this.submitted = false;
    },
      error => {
        this.expError = error.error;
        this.errorMessage = this.expError.errorMessage;
        this.isLoadingResults = false;
        this.submitted = false;
      });
  }

}
