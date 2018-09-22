import { Component, OnInit, ViewChild, ElementRef, Inject} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Role } from '../../../shared/models/role';
import { RoleService } from '../../../shared/services/role.service';
import { User } from '../../../shared/models/user';
import { UserService } from '../../../shared/services/user.service';
import { AddDialogComponent } from '../../role/add-dialog/add-dialog.component';
import { Country } from '../../../shared/models/country';
import { State } from '../../../shared/models/state';
import { CountryStateService } from '../../../shared/services/country-state.service';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { Permissions } from '../../../shared/models/permissions';

@Component({
  selector: 'app-adduser-dialog',
  templateUrl: './adduser-dialog.component.html',
  styleUrls: ['./adduser-dialog.component.scss']
})
export class AdduserDialogComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

  contactno = new FormControl(['',[Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),Validators.required]]);
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  pokemonControl = new FormControl();
  myControl: FormControl = new FormControl();

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  roles :Role[];
  role = new Role();
  user = new User();
  countries: string[];
  states: State[];
  permissions:Permissions[];
  checkedUsername:boolean = false;
  checkedUseremail:boolean = false;
  selectedFile:File = null;

  constructor(public dialogRef: MatDialogRef<AdduserDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
              private roleService:RoleService,
            private userService:UserService,
            private permissionService:PermissionsService,
            private _dataService: CountryStateService,
            public dialog: MatDialog) { }

  ngOnInit() {
    this.getRoles();
    this.countries = this._dataService.getCountries();
    if(this.data.id!=null && this.data.id>0){
      this.user = this.data;
      this.role = this.user.userrole;
      this.onSelect(this.user.country);
    }else{
      this.user.gender = 'M';
    }
  }

  getRoles():void{
    this.roleService.getRoles()
    .subscribe(data => {
      this.roles = data;
    });
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onSelect(country) {
    this.states = this._dataService.getStates().filter((item)=> item.country == country);
   }

  public confirmAdd(): void {
    console.log(JSON.stringify(this.user));
    this.userService.addUser(this.user, this.selectedFile);
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'Email is required' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  getCheckMessage(){}

  update(value: string) { 
    console.log(value);
    this.userService.checkUserByUsername(value).subscribe(result=>{
      console.log(result);
      if(result){
        this.checkedUsername = result;
      }
      console.log("--------USERNAME is HERE?----"+this.checkedUsername);
    })
  }

  checkEmail(value: string) { 
    console.log(value);
    this.userService.checkUserByUseremail(value).subscribe(result=>{
      console.log(result);
      if(result){
        this.checkedUseremail = result;
      }
      console.log("--------USEREMAIL is HERE?----"+this.checkedUseremail);
    })
  }

  addRoleDailog(role:Role): void {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '350px',
      data: { role : role }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed'+result);
      if(result == 1){
        this.getRoles();
      }
    });
  }

  uploadFile(event, file: ElementRef) {
    let files1 = event.target.files[0];
    file['value'] = (files1) ? files1.name : '';
    this.selectedFile = files1;
  }

}

