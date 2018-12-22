import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ThemeService } from '../shared/services/theme.service';

import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { BreadcrumbComponent } from './layout/breadcrumb/breadcrumb.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsComponent } from './forms/forms.component';
import { TablesComponent } from './tables/tables.component';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { LoaderDialogComponent } from './dialog/loader-dialog/loader-dialog.component';
import { SettingsComponent } from './layout/settings/settings.component';
import { WizardComponent } from './wizard/wizard.component';
import { OtherElementsComponent } from './other-elements/other-elements.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ErrorComponent } from './error/error.component';
import { DatatablesComponent } from './datatables/datatables.component';
import { ChatComponent } from './chat/chat.component';
import { GridSystemComponent } from './grid-system/grid-system.component';
import { ImageDialogComponent } from './dashboard/image-dialog/image-dialog.component';
import { UserComponent } from './user/user.component';
import { UserService } from '../shared/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RoleComponent } from './role/role.component';
import { RoleService } from '../shared/services/role.service';
import { AddDialogComponent } from './role/add-dialog/add-dialog.component';
import { AdduserDialogComponent } from './user/adduser-dialog/adduser-dialog.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PermissionsService } from '../shared/services/permissions.service';
import { AddPermissionDailogComponent } from './permissions/add-permission-dailog/add-permission-dailog.component';
import { EditPermissionDialogComponent } from './permissions/edit-permission-dialog/edit-permission-dialog.component';
import { ToasterService } from '../shared/services/toaster.service';
import { EditRoleDialogComponent } from './role/edit-role-dialog/edit-role-dialog.component';
import { CountryStateService } from '../shared/services/country-state.service';
import { ProductsComponent } from './products/products.component';
import { ProductItemService } from '../shared/services/product-item.service';
import { ProductService } from '../shared/services/product.service';
import { LoginService } from '../shared/services/login.service';
import { AddProductComponent } from './products/add-product/add-product.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomerService } from '../shared/services/customer.service';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { EmailCustomerComponent } from './customers/email-customer/email-customer.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { CreateSalesOrderComponent } from './sales-order/create-sales-order/create-sales-order.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PackagesComponent } from './packages/packages.component';
import { SalesOrdersService } from '../shared/services/sales-orders.service';
import { ProductItemComponent } from './product-item/product-item.component';
import { AddProductItemComponent } from './product-item/add-product-item/add-product-item.component';
import { PackageOrderService } from '../shared/services/package-order.service';
import { PackageItemService } from '../shared/services/package-item.service';
import { AddPackageComponent } from './packages/add-package/add-package.component';
import { AddItemsComponent } from './packages/add-items/add-items.component';
import { CreateShipmentComponent } from './packages/create-shipment/create-shipment.component';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { PrintInvoiceComponent } from './invoices/print-invoice/print-invoice.component';
import { UpdatePasswordDailogComponent } from './dialog/update-password-dailog/update-password-dailog.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { BreadcrumbService } from '../shared/services/breadcrumb.service';
import { SetPasswordComponent } from './set-password/set-password.component';
import { CompareValidatorDirective } from '../shared/directives/compare-validator.directive';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    QuillModule,
    NgxDatatableModule,
  ],
  providers: [ThemeService, AuthGuardService, BreadcrumbService, UserService, RoleService, PermissionsService, ToasterService, CountryStateService, ProductItemService, ProductService, LoginService, CustomerService, SalesOrdersService, PackageOrderService, PackageItemService],
  entryComponents: [ConfirmDialogComponent, LoaderDialogComponent, ImageDialogComponent, UpdatePasswordDailogComponent,
    AddDialogComponent, AdduserDialogComponent, EditRoleDialogComponent, AddPermissionDailogComponent,
    EditPermissionDialogComponent, AddProductComponent, EmailCustomerComponent,
    AddProductItemComponent],
  declarations: [CompareValidatorDirective, LayoutComponent, DashboardComponent, HeaderComponent,
     SidebarComponent, BreadcrumbComponent, ProfileComponent, FormsComponent,
      TablesComponent, DialogComponent, ConfirmDialogComponent, LoaderDialogComponent,
       SettingsComponent, WizardComponent, OtherElementsComponent, LoginComponent, 
       RegisterComponent, ForgotPasswordComponent, ErrorComponent, DatatablesComponent, 
       ChatComponent, GridSystemComponent, ImageDialogComponent, UserComponent, RoleComponent,
        AddDialogComponent, AdduserDialogComponent, PermissionsComponent, AddPermissionDailogComponent,
     EditPermissionDialogComponent, EditRoleDialogComponent, 
     ProductsComponent, AddProductComponent, ViewProductComponent, CustomersComponent, AddCustomerComponent,
      ViewCustomerComponent, EmailCustomerComponent, SalesOrderComponent,
       CreateSalesOrderComponent, PackagesComponent, InvoicesComponent, ProductItemComponent, 
       AddProductItemComponent, AddPackageComponent, AddItemsComponent, CreateShipmentComponent, 
       CreateInvoiceComponent, PrintInvoiceComponent, UpdatePasswordDailogComponent, SetPasswordComponent]
})
export class AdminModule { }
