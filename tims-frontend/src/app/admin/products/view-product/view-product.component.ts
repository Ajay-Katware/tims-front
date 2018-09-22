import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductItem } from '../../../shared/models/product-item';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { AddProductComponent } from '../add-product/add-product.component';
import { Location } from '@angular/common';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  products: Product[];
  selectedProduct: Product;
  productItems: ProductItem[];
  displayedColumns = ['position', 'serialNo', 'itemCode', 'barcode'];
  dataSource: MatTableDataSource<ProductItem>;

  constructor(private route: ActivatedRoute,
    private dialog: MatDialog,
    private location:Location,
    private productService: ProductService) { }

  ngOnInit() {
    this.getProductList();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != null && id > 0) {
      this.getProductInformation(id);
    }
  }

  getProductList() {
    this.productService.getProducts().subscribe(result => {
      this.products = result;
    })
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    //this.productItems = this.selectedProduct.productitemsList;
    this.dataSource = new MatTableDataSource(this.productItems);
  }


  getProductInformation(id: number) {
    this.productService.getProduct(id).subscribe(data => {
      this.selectedProduct = data;
      //this.productItems = this.selectedProduct.productitemsList;
      this.dataSource = new MatTableDataSource(this.productItems);
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editProduct(): void {
    let dialogRef = this.dialog.open(AddProductComponent, {
      width: "800px;",
      data: { product: this.selectedProduct }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result) {
        this.selectedProduct = this.productService.getDialogData();
        this.getProductList();
      }
    });
  }

  deleteProduct() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: this.selectedProduct.id, type: "product" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.location.back();
      }
    });
  }

  isMobile() {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

}
