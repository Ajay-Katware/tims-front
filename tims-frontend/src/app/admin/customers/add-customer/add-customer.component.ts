import { Component, OnInit } from '@angular/core';
import { Country } from '../../../shared/models/country';
import { State } from '../../../shared/models/state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../../shared/services/customer.service';
import { Location } from '@angular/common';
import { Customer } from '../../../shared/models/customer';
import { CountryStateService } from '../../../shared/services/country-state.service';
import { MatDialog } from '@angular/material';
import { LoaderDialogComponent } from '../../dialog/loader-dialog/loader-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  selectedCountry: Country = new Country('India');
  countries: string[];
  states: State[];
  shipstates: State[];
  selectedIndex: number = 0;
  customerForm: FormGroup;
  customer: Customer;
  options: string[] =  ['Mr.', 'Mrs.', 'Ms', 'Miss', 'Dr.']

  constructor(private customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private _dataService: CountryStateService,
    private location: Location) {
    this.createForm();
  }

  ngOnInit() {
    this.countries = this._dataService.getCountries();
    const id = +this.route.snapshot.paramMap.get('id');
    if (id != null && id > 0) {
      this.getFullCustomerInformation(id);
    }
  }

  createForm(): void {
    this.customerForm = this._formBuilder.group({
      id: '',
      salutation: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      contactno: ['', Validators.required],
      alternatecontact: '',
      emailid: ['', Validators.required],
      alternateemail: '',
      faxno: '',
      billstreetno: ['', Validators.required],
      billstreetname: '',
      billcity: ['', Validators.required],
      billpostalcode: '',
      billstate: '',
      billcountry: '',
      shipstreetno: '',
      shipstreetname: '',
      shipcity: '',
      shippostalcode: '',
      shipstate: '',
      shipcountry: '',
    })
  }

  getFullCustomerInformation(id: number): void {
    this.customerService.getCustomer(id).subscribe(result => {
      this.customer = result;
      this.setForm(this.customer);
      this.onSelect(this.customer.billcountry);
      this.onSelectShipCountry(this.customer.shipcountry);
    })
  }

  setForm(customer: Customer) {
    this.customerForm.patchValue({
      id: customer.id,
      salutation: customer.salutation,
      firstname: customer.firstname,
      lastname: customer.lastname,
      contactno: customer.contactno,
      alternatecontact: customer.alternatecontact,
      emailid: customer.emailid,
      alternateemail: customer.alternateemail,
      faxno: customer.faxno,
      billstreetno: customer.billstreetno,
      billstreetname: customer.billstreetname,
      billcity: customer.billcity,
      billstate: customer.billstate,
      billpostalcode: customer.billpostalcode,
      billcountry: customer.billcountry,
      shipstreetno: customer.shipstreetno,
      shipstreetname: customer.shipstreetname,
      shipcity: customer.shipcity,
      shipstate: customer.shipstate,
      shippostalcode: customer.shippostalcode,
      shipcountry: customer.shipcountry
    });
  }

  onSelect(country) {
    this.states = this._dataService.getStates().filter((item) => item.country == country);
  }

  onSelectShipCountry(country) {
    this.shipstates = this._dataService.getStates().filter((item) => item.country == country);
  }


  copyBillingAddress() {
    const formModel = this.customerForm.value;
    this.customerForm.patchValue({
      shipstreetno: formModel.billstreetno,
      shipstreetname: formModel.billstreetname,
      shipcity: formModel.billcity as string,
      shippostalcode: formModel.billpostalcode as string,
      shipstate: formModel.billstate as string,
      shipcountry: formModel.billcountry as string,
    });
    this.onSelectShipCountry(formModel.billcountry);
  }

  copyShippingAddress() {
    const formModel = this.customerForm.value;
    this.customerForm.patchValue({
      billstreetno: formModel.shipstreetno as string,
      billstreetname: formModel.shipstreetname as string,
      billcity: formModel.shipcity as string,
      billpostalcode: formModel.shippostalcode as string,
      billstate: formModel.shipstate as string,
      billcountry: formModel.shipcountry as string,
    });
    this.onSelect(formModel.shipcountry);
  }

  preparedSaveCustomer(): Customer {
    const formModel = this.customerForm.value;
    const saveHero: Customer = {
      id: formModel.id as number,
      salutation: formModel.salutation as string,
      firstname: formModel.firstname as string,
      lastname: formModel.lastname as string,
      contactno: formModel.contactno as string,
      alternatecontact: formModel.alternatecontact as string,
      emailid: formModel.emailid as string,
      alternateemail: formModel.alternateemail as string,
      faxno: formModel.faxno as string,
      billstreetno: formModel.billstreetno as string,
      billstreetname: formModel.billstreetname as string,
      billcity: formModel.billcity as string,
      billpostalcode: formModel.billpostalcode as string,
      billstate: formModel.billstate as string,
      billcountry: formModel.billcountry as string,
      shipstreetno: formModel.shipstreetno as string,
      shipstreetname: formModel.shipstreetname as string,
      shipcity: formModel.shipcity as string,
      shippostalcode: formModel.shippostalcode as string,
      shipstate: formModel.shipstate as string,
      shipcountry: formModel.shipcountry as string,
    };
    return saveHero;
  }

  confirmAdd(): void {
    this.customer = this.preparedSaveCustomer();
    this.customerService.addCustomer(this.customer);
    this.showLoader();
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
      setTimeout(() => dialogRef.close(), 2000);
      this.location.back();
    });
  }

  onNoClick(): void {
    this.location.back();
  }

}
