import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product= new Product();
  headingName="Add";
  constructor(public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  private productService:ProductService) { }

  ngOnInit() {
    if(this.data!=null){
      this.product = this.data.product;
      this.headingName = "Edit";
    }
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  public confirmAdd(): void {
    this.productService.addProduct(this.product);
  }

}
