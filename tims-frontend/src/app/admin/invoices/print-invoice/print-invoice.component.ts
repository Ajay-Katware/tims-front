import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { SalesOrdersService } from '../../../shared/services/sales-orders.service';
import { CustomerService } from '../../../shared/services/customer.service';
import { Location } from '@angular/common';
import { Customer } from '../../../shared/models/customer';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Product } from '../../../shared/models/product';
import { ProductItem } from '../../../shared/models/product-item';
import { ProductItemService } from '../../../shared/services/product-item.service';
import { SalesOrderDto } from '../../../shared/models/sales-order-dto';
import { SalesItem } from '../../../shared/models/sales-item';
import { SalesItemDto } from '../../../shared/models/sales-item-dto';
import { LoaderDialogComponent } from '../../dialog/loader-dialog/loader-dialog.component';
import { SalesOrder } from '../../../shared/models/sales-order';
import { AutoNumber } from '../../../shared/models/auto-number';
import { ActivatedRoute, Router } from '../../../../../node_modules/@angular/router';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent implements OnInit {

  @ViewChild('content') content:ElementRef;
  id:number;

  customers: Customer[];
  salesOrderDto: SalesOrderDto;
  billingAddress: string;
  shippingAddress: string;
  products: Product[];
  product: Product;
  customeremail: string;
  productItemList: ProductItem[];
  productItem: ProductItem;
  selectedCustomer: Customer;
  invoiceno: string;
  autonumber: AutoNumber;
  salesOrder: SalesOrder;
  length: number = 0;
  orderDate = new Date();
  minDate = new Date();
  isLoadingResults: boolean = false;

  constructor(private salesOrdersService: SalesOrdersService,
    private customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private productItemService: ProductItemService,
    private dialog: MatDialog,
    private toasterService:ToasterService,
    private router:Router,
    private location: Location) { }

  ngOnInit() {
    this.id = this.route.snapshot.queryParams["id"];
    this.isLoadingResults = true;
    if (this.id != null && this.id > 0) {
      this.getFullSOInformation(this.id);
    }
  }

  getFullSOInformation(id:number){
    this.salesOrdersService.getSalesOrder(id).subscribe(data=>{
      this.salesOrder = data;
      console.log("", this.salesOrder);
      this.minDate = this.salesOrder.orderdate;
      this.orderDate = this.salesOrder.orderdate;
      this.isLoadingResults = false;
    })
  }

  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  

      var pdfname = `Invoice_${this.id}.pdf`;
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); 
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(pdfname);    
    });  
  }
  
  printScreen(){
    var printContents = document.getElementById('contentToConvert').innerHTML;
    var popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
    popupWinindow.document.open();
    popupWinindow.document.write('<html><head></head><body onload="window.print()">' + printContents + '</html>');
    popupWinindow.document.close();
  }

  goBack(){
    this.location.back();
  }

}
