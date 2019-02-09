import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { compareValidator } from '../../../shared/directives/compare-validator.directive';
import { UserService } from '../../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-update-password-dailog',
  templateUrl: './update-password-dailog.component.html',
  styleUrls: ['./update-password-dailog.component.scss']
})
export class UpdatePasswordDailogComponent implements OnInit {

  heroForm:FormGroup;
  userId:number = 0;
  myPassword :string;
  constructor(public dialogRef: MatDialogRef<UpdatePasswordDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb:FormBuilder, 
    private toasterService:ToasterService,
    private userService: UserService) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userid'));
    console.log("this.userId", this.userId);
    this.creatForm();
  }

  creatForm(){
    this.heroForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confPassword: ['', [Validators.required, Validators.minLength(4), compareValidator('password')]]
    });
  }

  get password(){
    return this.heroForm.get('password');
  }

  get confPassword(){
    return this.heroForm.get('confPassword');
  }

  onSubmit(){
    const formModel = this.heroForm.value;
    this.myPassword = formModel.password;
    if(this.userId > 0){
      console.log("this.password", this.myPassword);
      this.userService.update(this.userId, this.myPassword).subscribe(data=>{
        if(data != null){
          this.dialogRef.close(false);
        }else{
          this.dialogRef.close(true);
        }
      }, (err:HttpErrorResponse)=>{
        this.dialogRef.close();
      });
    }
  }

  onNoClick() {
      this.dialogRef.close();
  }


}
