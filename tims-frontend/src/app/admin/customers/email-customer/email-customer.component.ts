import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Customer } from '../../../shared/models/customer';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatChipInputEvent } from '@angular/material';
import { CustomerService } from '../../../shared/services/customer.service';
import { CustomerEmail } from '../../../shared/models/customer-email';

@Component({
  selector: 'app-email-customer',
  templateUrl: './email-customer.component.html',
  styleUrls: ['./email-customer.component.scss']
})
export class EmailCustomerComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  date = new FormControl(new Date());
  myControl: FormControl = new FormControl();
  customer:Customer;
  customerEmail = new CustomerEmail();
 
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  removableEmail: boolean = true;
  addOnBlur: boolean = true;
  subject:string;

  public editor;
  public editorContent = `<h3>I am Example content</h3>`;
  public editorOptions = {
    placeholder: "insert content..."
  };

  separatorKeysCodes = [ENTER, COMMA];

  chips = [
  ];

  emailChips = [
  ];

  constructor(public dialogRef:MatDialogRef<EmailCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog:MatDialog,
  public customerService:CustomerService) { }

  ngOnInit() {
    if (this.data.customer!= null) {
      this.customer = this.data.customer;
      this.emailChips = [
        { name: this.customer.emailid, selected: false}
      ];
    }
  }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }
 
  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }
 
  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }
 
  onContentChanged({ quill, html, text }) {
    alert("Hi");
    console.log('quill content is changed!', quill, html, text);
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our color
    if ((value || '').trim()) {
      this.chips.push({ name: value.trim(), selected: true });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  
  addSendtoEmail(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;

    // Add our color
    if ((value || '').trim()) {
      this.emailChips.push({ name: value.trim(), selected: true });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(color: any): void {
    let index = this.chips.indexOf(color);
    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  removeEmail(color: any): void {
    let index = this.emailChips.indexOf(color);
    if (index >= 0) {
      this.emailChips.splice(index, 1);
    }
  }

  uploadFile(event, file: ElementRef) {
    let files1 = event.target.files[0];
    file['value'] = (files1) ? files1.name : '';
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  public confirmAdd(): void {
    this.customerEmail.sendToEmails = this.emailChips;
    this.customerEmail.ccEmails = this.chips;
    //this.customerService.sendEmailToCateringCompany(this.customerEmail);
  }

}
