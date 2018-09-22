import { Component, OnInit, Inject } from '@angular/core';
import { Permissions } from '../../../shared/models/permissions';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-permission-dialog',
  templateUrl: './edit-permission-dialog.component.html',
  styleUrls: ['./edit-permission-dialog.component.scss']
})
export class EditPermissionDialogComponent implements OnInit {
  permissions = new Permissions();
  
  constructor(
    public dialogRef: MatDialogRef<EditPermissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private permissionsService:PermissionsService) {}

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

  public confirmUpdate(): void {
    this.permissionsService.addPermission(this.data);
  }

  ngOnInit() {
  }

}
