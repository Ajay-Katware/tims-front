import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { User } from '../../../shared/models/user';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { UpdatePasswordDailogComponent } from '../../dialog/update-password-dailog/update-password-dailog.component';
import { LoginService } from '../../../shared/services/login.service';
import { GeneratedFile } from '@angular/compiler';
import { GenericTerm } from '../../Generic/generic-term';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  @Input('sidenav') sidenav: any;
  @Input('sidebar') sidebar: any;

  generic = new GenericTerm();
  removeMessage: Boolean = false;
  themes;
  displaySearch: Boolean = false;

  loggedIn : Boolean = false;
  loggedUser:any;
  user = new User();

  constructor(private themeService: ThemeService,
    private loginService:LoginService,
    private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.themes = this.themeService.themes;
    this.user = JSON.parse(localStorage.getItem("auth_token"));
  }

  changeTheme(theme) {
    this.themeService.changeTheme(theme);
  }

  logout() {
    this.loggedIn  = this.loginService.logout();
    if(!this.loggedIn){
      this.router.navigateByUrl("/admin/login");
    }
  }

  openUpdatePasswordDialog() {
    let dialogRef = this.dialog.open(UpdatePasswordDailogComponent, {
      width: '350px'
    });

     dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {

       }
    });
  }

}
