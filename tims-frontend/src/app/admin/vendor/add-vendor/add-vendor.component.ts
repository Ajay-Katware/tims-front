import { Component, OnInit } from '@angular/core';
import { Country } from '../../../shared/models/country';
import { State } from '../../../shared/models/state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CountryStateService } from '../../../shared/services/country-state.service';
import { MatDialog } from '@angular/material';
import { LoaderDialogComponent } from '../../dialog/loader-dialog/loader-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../shared/services/vendor.service';
import { Vendor } from '../../../shared/models/vendor';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {

  selectedCountry: Country = new Country('India');
  countries: string[];
  states: State[];
  shipstates: State[];
  selectedIndex: number = 0;
  vendorForm: FormGroup;
  vendor: Vendor;
  options: string[] =  ['Mr.', 'Mrs.', 'Ms', 'Miss', 'Dr.'];
  isLoadingResults:boolean = false;

  constructor(private vendorService: VendorService,
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private _dataService: CountryStateService,
    private toasterService:ToasterService,
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
    this.vendorForm = this._formBuilder.group({
      id: '',
      salutation: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      contactno: ['', Validators.required],
      alternatecontact: '',
      emailid: ['', Validators.required],
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
    this.vendorService.getVendor(id).subscribe(result => {
      this.vendor = result;
      this.setForm(this.vendor);
      this.onSelect(this.vendor.billcountry);
      this.onSelectShipCountry(this.vendor.shipcountry);
    })
  }

  setForm(vendor: Vendor) {
    this.vendorForm.patchValue({
      id: vendor.id,
      salutation: vendor.salutation,
      firstname: vendor.firstname,
      lastname: vendor.lastname,
      contactno: vendor.contactno,
      alternatecontact: vendor.alternatecontact,
      emailid: vendor.emailid,
      faxno: vendor.faxno,
      billstreetno: vendor.billstreetno,
      billstreetname: vendor.billstreetname,
      billcity: vendor.billcity,
      billstate: vendor.billstate,
      billpostalcode: vendor.billpostalcode,
      billcountry: vendor.billcountry,
      shipstreetno: vendor.shipstreetno,
      shipstreetname: vendor.shipstreetname,
      shipcity: vendor.shipcity,
      shipstate: vendor.shipstate,
      shippostalcode: vendor.shippostalcode,
      shipcountry: vendor.shipcountry
    });
  }

  onSelect(country) {
    this.states = this._dataService.getStates().filter((item) => item.country == country);
  }

  onSelectShipCountry(country) {
    this.shipstates = this._dataService.getStates().filter((item) => item.country == country);
  }


  copyBillingAddress() {
    const formModel = this.vendorForm.value;
    this.vendorForm.patchValue({
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
    const formModel = this.vendorForm.value;
    this.vendorForm.patchValue({
      billstreetno: formModel.shipstreetno as string,
      billstreetname: formModel.shipstreetname as string,
      billcity: formModel.shipcity as string,
      billpostalcode: formModel.shippostalcode as string,
      billstate: formModel.shipstate as string,
      billcountry: formModel.shipcountry as string,
    });
    this.onSelect(formModel.shipcountry);
  }

  preparedSaveCustomer(): Vendor {
    const formModel = this.vendorForm.value;
    const saveHero: Vendor = {
      id: formModel.id as number,
      salutation: formModel.salutation as string,
      firstname: formModel.firstname as string,
      lastname: formModel.lastname as string,
      contactno: formModel.contactno as string,
      alternatecontact: formModel.alternatecontact as string,
      emailid: formModel.emailid as string,
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
    this.vendor = this.preparedSaveCustomer();
    this.isLoadingResults = true;
    this.vendorService.addVendor(this.vendor).subscribe(data => {
      this.isLoadingResults = false;
      if (this.vendor.id != null && this.vendor.id > 0) {
        this.toasterService.openSuccessSnackBar('Successfully updated', '', 2000);
      } else {
        this.toasterService.openSuccessSnackBar('Successfully added', '', 2000);
      }
      this.location.back();
    },
      (err: HttpErrorResponse) => {
        this.toasterService.openErrorSnackBar('Error occurred. Details: ' + err.name + ' ' + err.message, '', 8000);
      });
    //this.showLoader();
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
