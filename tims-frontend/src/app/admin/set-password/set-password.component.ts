import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../../shared/services/login.service';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/user';
import { ToasterService } from '../../shared/services/toaster.service';
import { TejovatError } from '../../shared/models/tejovat-error';

class UserModel {
  id: number;
  userPwd: string;
  confirmPwd: string;
}

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  private sub: any;
  resettoken: string;
  user: User;
  pwdInfo = new UserModel();
  pwdUser = new User();
  errorMessage: string;
  errorMessage2: string;
  succssMessage: string;
  expError: TejovatError;
  constructor(private themeService: ThemeService,
    private route: ActivatedRoute,
    private toasterService: ToasterService,
    private userService: UserService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.resettoken = params['resetToken'];
      if (this.resettoken != null) {
        this.userService.checkUserByResetToken(this.resettoken).subscribe(result => {
          this.user = result;
        },
          error => {
            this.expError = error.error;
            this.errorMessage = this.expError.errorMessage;
          })
      }
    });
  }

  onSubmit(): void {
    this.pwdUser.id = this.user.id !=null?this.user.id :0;
    this.pwdUser.userpwd = this.pwdInfo.userPwd;
    if (this.pwdInfo.userPwd !== this.pwdInfo.confirmPwd) {
      this.errorMessage2 = "Passwords do not match";
    } else {
      this.errorMessage = null;
      this.userService.addNewPassword(this.pwdUser).subscribe(data => {
        this.errorMessage = null;
        this.errorMessage2 = null;
        this.succssMessage = "Your password updated successfully";
        this.toasterService.openSuccessSnackBar("Your password updated successfully", 'ok', 1000);
      },
        error => {
          this.toasterService.openErrorSnackBar("Something is wrong", 'error', 1000)
        });
    }
  }
}
