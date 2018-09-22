import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../shared/services/customer.service';
import { Customer } from '../../../shared/models/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailCustomerComponent } from '../email-customer/email-customer.component';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {

  customers: Customer[];
  selectedCustomer: Customer;
  constructor(private customerService: CustomerService,
    private dialog:MatDialog,
    private router:Router,
    private location:Location,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCustomers();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != null && id > 0) {
      this.getCustomerInformation(id);
    }
  }

  getCustomers(): void {
    this.customerService.getCustomerList().subscribe(result => {
      this.customers = result;
    })
  }

  getCustomerInformation(id: number): void {
    this.customerService.getCustomer(id).subscribe(data => {
      this.selectedCustomer = data;
    })
  }

  selectCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  emailToCustomers(): void {
    let dialogRef = this.dialog.open(EmailCustomerComponent, {
      width:"700px",
      data:{customer:this.selectedCustomer}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: ' + result);
      if (result) {
        //this.showLoader();
      }
    });
  }

  editCustomer():void{
    this.router.navigateByUrl("/admin/customers/edit/"+this.selectedCustomer.id);
  }

  deleteCustomer() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { id: this.selectedCustomer.id, type:"customer" }
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
