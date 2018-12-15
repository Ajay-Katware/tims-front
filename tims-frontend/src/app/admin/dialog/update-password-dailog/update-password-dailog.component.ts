import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-password-dailog',
  templateUrl: './update-password-dailog.component.html',
  styleUrls: ['./update-password-dailog.component.scss']
})
export class UpdatePasswordDailogComponent implements OnInit {

  heroForm:FormGroup;
  userId:number = 0;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userid'));
    console.log("this.userId", this.userId);
    this.creatForm();
  }

  creatForm(){
    this.heroForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      confPassword: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(){
    const formModel = this.heroForm.value;
    let password = formModel.password;
    console.log("this.password", password);
    if(this.userId > 0){

    }
  }

}
