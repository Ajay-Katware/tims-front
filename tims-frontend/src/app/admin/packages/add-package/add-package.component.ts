import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '../../../../../node_modules/@angular/forms';
import { Location } from '../../../../../node_modules/@angular/common';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';

import { Customer } from '../../../shared/models/customer';
import { CustomerService } from '../../../shared/services/customer.service';
import { SalesOrdersService } from '../../../shared/services/sales-orders.service';
import { PackageOrderService } from '../../../shared/services/package-order.service';
import { SalesOrder } from '../../../shared/models/sales-order';
import { PackageOrder } from '../../../shared/models/package-order';
import { SalesItem } from '../../../shared/models/sales-item';
import { LoaderDialogComponent } from '../../dialog/loader-dialog/loader-dialog.component';
import { MatDialog } from '../../../../../node_modules/@angular/material';
import { AutoNumber } from '../../../shared/models/auto-number';
import { PackageItem } from '../../../shared/models/package-item';


@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.scss']
})
export class AddPackageComponent implements OnInit {

  customers: Customer[];
  salesOrders: SalesOrder[];
  salesorderlist: SalesOrder[];
  packageForm: FormGroup;
  packageOrder: PackageOrder;
  orderDate = new Date();
  minDate = new Date();
  selectedCustomer: Customer;
  selectedSalesOrder: SalesOrder;
  salesItems: SalesItem[];
  visible: boolean = false;
  autonumber: AutoNumber;
  pkgNo: string;
  constructor(private packageOrderService: PackageOrderService,
    private salesOrderService: SalesOrdersService,
    private customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.getSalesOrders();
    this.createForm();
    this.getNextPKGNo();
  }


  getNextPKGNo(): void {
    this.packageOrderService.getNextPackageNumber().subscribe(result => {
      this.autonumber = result;
      this.pkgNo = this.autonumber.nextno;
      this.setValue();
    })
  }

  setValue() {
    this.packageForm.patchValue({
      packageno: this.pkgNo
    })
  }

  getCustomers(): void {
    this.customerService.getCustomerList().subscribe(result => {
      this.customers = result;
    })
  }

  getSalesOrders(): void {
    this.salesOrderService.getSalesOrders().subscribe(result => {
      this.salesOrders = result;
    })
  }

  createForm(): void {
    this.packageForm = this._formBuilder.group({
      id: '',
      packageno: ['', Validators.required],
      packagedate: [this.orderDate, Validators.required],
      totalqty: '0',
      packagenotes: '',
      salesorderid: '',
      delivered: ['N', Validators.required],
      orderedItems: this._formBuilder.array([])
    })
  }

  get orderedItems(): FormArray {
    return this.packageForm.get('orderedItems') as FormArray;
  };

  removeAddress(i: number) {
    const control = <FormArray>this.packageForm.controls['orderedItems'];
    control.removeAt(i);
  }

  choosedCustomer(id: number) {
    this.salesorderlist = this.salesOrders.filter(x => x.customerid.id === id);
  }

  choosedSalesOrder() {
    const formModel = this.packageForm.value;
    this.selectedSalesOrder = this.salesOrders.find(x => x.id === formModel.salesorderid);
    this.salesItems = this.selectedSalesOrder.salesItemsCollection;
    this.visible = true;
    this.setItemTableValue(this.salesItems);
    this.showWaitLoader();
  }

  setItemTableValue(items: SalesItem[]) {
    var arr = [];
    let totalQuantity = 0;
    for (var i = 0; i < items.length; i++) {
      arr.push(this.buildItem(items[i]));
      totalQuantity += items[i].quantity;
    }
    const addressFormArray = this._formBuilder.array(arr);
    this.packageForm.setControl('orderedItems', addressFormArray);
    this.setTotalQuantity(totalQuantity);
  }

  buildItem(item: SalesItem): FormGroup {
    return this._formBuilder.group({
      id: [''],
      itemid: [item.itemid.id],
      productname: [item.productname],
      qtyordered: [item.quantity],
      qtytopack: [item.quantity],
      qtypacked: [0],
    })
  }

  setTotalQuantity(qty : number){
    this.packageForm.patchValue({
      totalqty: qty
    })
  }

  applyTotal(i:number){
    const formModel2 = this.packageForm.value;
    let arrlength = this.orderedItems.length;
    let totalQuantity = 0;
    for (let k = 0; k < arrlength; k++) {
      totalQuantity += formModel2.orderedItems[k].qtyordered;
    }
    this.setTotalQuantity(totalQuantity);
  }

  showWaitLoader(): void {
    let dialogRef = this.dialog.open(LoaderDialogComponent, {
      width: '200px',
      height: '200px',
      data: { loaderText: "Please Wait...", loadingTime: 2000 },
      disableClose: true
    });

    dialogRef.afterOpen().subscribe(result => {
      console.log('The dialog was closed');
      setTimeout(() => {
        dialogRef.close();
      }, 2000);
    });
  }

  showLoader(): void {
    let dialogRef = this.dialog.open(LoaderDialogComponent, {
      width: '200px',
      height: '200px',
      data: { loaderText: "Please Wait...", loadingTime: 2000 },
      disableClose: true
    });

    dialogRef.afterOpen().subscribe(result => {
      console.log('The dialog was closed');
      setTimeout(() => {
        dialogRef.close();
        this.location.back();
      }, 2000);
    });
  }

  confirmAdd(): void {
    this.packageOrder = this.preparedPackageData();
    this.packageOrderService.create(this.packageOrder);
    this.showLoader();
  }

  preparedPackageData(): PackageOrder {
    const model = this.packageForm.value;

    const packageItemDeepCopy: PackageItem[] = model.orderedItems.map(
      (pkgItem: PackageItem) => Object.assign({}, pkgItem)
    );

    const savePkg: PackageOrder ={
      id: model.id as number,
      packageno: model.packageno as string,
      packagedate: model.packagedate as Date,
      packagenotes: model.packagenotes as string,
      totalqty: model.totalqty as number,
      shipmentno: model.shipmentno as string,
      shipdate: model.shipdate as Date,
      carrier: model.carrier as string,
      tracking: model.tracking as string,
      shipnotes: model.shipnotes as string,
      delivered: model.delivered as string,
      salesorderid: this.selectedSalesOrder as SalesOrder,
      packageItemsList: packageItemDeepCopy,
    }
    return savePkg;
  }

  goBack(): void {
    this.location.back();
  }

  

}
