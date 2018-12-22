import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { compareValidator } from '../../../shared/directives/compare-validator.directive';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-update-password-dailog',
  templateUrl: './update-password-dailog.component.html',
  styleUrls: ['./update-password-dailog.component.scss']
})
export class UpdatePasswordDailogComponent implements OnInit {

  heroForm:FormGroup;
  userId:number = 0;
  constructor(public dialogRef: MatDialogRef<UpdatePasswordDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb:FormBuilder, private userService: UserService) { }

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
    let password = formModel.password;
    console.log("this.password", password);
    if(this.userId > 0){
      this.userService.update(this.userId, password);
    }
  }

    onNoClick() {
      this.dialogRef.close();
    }
  

}
