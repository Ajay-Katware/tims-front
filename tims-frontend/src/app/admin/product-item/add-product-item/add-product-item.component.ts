import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../../node_modules/@angular/material';
import { FormGroup, FormControl } from '../../../../../node_modules/@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { ProductItemService } from '../../../shared/services/product-item.service';
import { Product } from '../../../shared/models/product';
import { ProductItem } from '../../../shared/models/product-item';

@Component({
  selector: 'app-add-product-item',
  templateUrl: './add-product-item.component.html',
  styleUrls: ['./add-product-item.component.scss']
})
export class AddProductItemComponent implements OnInit {

  productItemForm: FormGroup;
  products: Product[];
  product:Product;
  productItem:ProductItem;
  constructor(public dialogRef: MatDialogRef<AddProductItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private productItemService: ProductItemService) { }

  ngOnInit() {
    this.createItemForm();
    this.getProducts();
    if(this.data!=null){
      this.productItem = this.data.item;
      this.setFormValue(this.productItem);
    }
  }

  setFormValue(productItem: ProductItem){
    this.productItemForm.patchValue({
      id: productItem.id,
      productid: productItem.productid.id,
      serialNo: productItem.serialNo,
      itemCode: productItem.itemCode,
      barcode: productItem.barcode
    })
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    })
  }

  createItemForm(): void {
    this.productItemForm = new FormGroup({
      id: new FormControl(''),
      productid: new FormControl(''),
      serialNo: new FormControl(''),
      itemCode: new FormControl(''),
      barcode: new FormControl('')
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.productItem = this.preparedProductItem();
    console.log("------------------------------"+JSON.stringify(this.productItem));
    this.productItemService.addProductItem(this.productItem);
  }

  preparedProductItem(): ProductItem {
    const formModel = this.productItemForm.value;
    this.product = this.products.find(x=> x.id == formModel.productid);
    const saveProductItem: ProductItem = {
      id:formModel.id as number,
      productid: formModel.productid as Product,
      itemCode: formModel.itemCode as string,
      serialNo: formModel.serialNo as string,
      barcode: formModel.barcode as string
    };
    return saveProductItem;
  }

}
