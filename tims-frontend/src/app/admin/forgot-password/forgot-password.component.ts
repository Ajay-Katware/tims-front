import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../shared/services/login.service';
import { Router } from '@angular/router';
import { TimsException } from '../../shared/models/tims-exception';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  userEmail: string;
  expError: TimsException;
  email = new FormControl('', [Validators.required, Validators.email]);
  isLoadingResults: boolean = false;
  constructor(private themeService: ThemeService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.userEmail = this.email.value;
    this.isLoadingResults = true;
    this.loginService.forgotPassword(this.userEmail).subscribe(result => {
      if (result) {
        this.successMessage = "We've sent an email to " + this.userEmail + ". Click the link in the email to reset your password.";
      }
      this.isLoadingResults = false;
    },
      error => {
        this.expError = error.error;
        this.errorMessage = this.expError.errorMessage;
        this.isLoadingResults = false;
      });
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

}
