import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from '../../../shared/services/role.service';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { UserService } from '../../../shared/services/user.service';
import { ProductService } from '../../../shared/services/product.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { SalesOrdersService } from '../../../shared/services/sales-orders.service';
import { ProductItemService } from '../../../shared/services/product-item.service';
import { VendorService } from '../../../shared/services/vendor.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private roleService: RoleService,
    private permissionsService: PermissionsService,
    private userService: UserService,
    private customerService:CustomerService,
    private itemService:ProductItemService,
    private salesorderService:SalesOrdersService,
    private vendorService:VendorService,
    private productService: ProductService) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    console.log("data" + this.data.type);
    switch (this.data.type) {
      case "user":
        console.log("user");
        this.userService.deleteUser(this.data.id);
        break;
      case "permission":
        console.log("permission");
        this.permissionsService.deletePermission(this.data.id);
        break;
      case "role":
        console.log("role");
        this.roleService.deleteRole(this.data.id);
        break;
      case "product":
        console.log("product");
        this.productService.deleteProduct(this.data.id);
        break;
      case "productitem":
        console.log("productitem"), this.data.id;
        this.itemService.deleteProductItem(this.data.id);
        break;
      case "customer":
        console.log("customer");
        this.customerService.deleteCustomer(this.data.id);
        break;
      case "vendor":
        console.log("customer");
        this.vendorService.deleteVendor(this.data.id);
        break;
      case "salesorder":
      console.log("salesorder");
        this.salesorderService.remove(this.data.id);
        break;
      default:
        console.log("default");
    }
  }

  ngOnInit() {
  }

}
