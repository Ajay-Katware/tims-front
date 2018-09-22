import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { Permissions } from '../../../shared/models/permissions';

@Component({
  selector: 'app-add-permission-dailog',
  templateUrl: './add-permission-dailog.component.html',
  styleUrls: ['./add-permission-dailog.component.scss']
})
export class AddPermissionDailogComponent implements OnInit {
  permissions = new Permissions();
  
  constructor(
    public dialogRef: MatDialogRef<AddPermissionDailogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Permissions,
    private permissionsService:PermissionsService) {
      this.permissions = data;
     }

  formControl = new FormControl('', [
    Validators.required
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.permissionsService.addPermission(this.data);
  }

  ngOnInit() {
  }

}
