import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsComponent } from './forms/forms.component';
import { TablesComponent } from './tables/tables.component';
import { DialogComponent } from './dialog/dialog.component';
import { WizardComponent } from './wizard/wizard.component';
import { OtherElementsComponent } from './other-elements/other-elements.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ErrorComponent } from './error/error.component';
import { DatatablesComponent } from './datatables/datatables.component';
import { ChatComponent } from './chat/chat.component';
import { GridSystemComponent } from './grid-system/grid-system.component';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { ProductsComponent } from './products/products.component';
import { ViewProductComponent } from './products/view-product/view-product.component';
import { CustomersComponent } from './customers/customers.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { ViewCustomerComponent } from './customers/view-customer/view-customer.component';
import { SalesOrderComponent } from './sales-order/sales-order.component';
import { CreateSalesOrderComponent } from './sales-order/create-sales-order/create-sales-order.component';
import { PackagesComponent } from './packages/packages.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { AddPackageComponent } from './packages/add-package/add-package.component';
import { CreateShipmentComponent } from './packages/create-shipment/create-shipment.component';
import { CreateInvoiceComponent } from './invoices/create-invoice/create-invoice.component';
import { PrintInvoiceComponent } from './invoices/print-invoice/print-invoice.component';
import { AuthGuardService as AuthGuard } from '../shared/services/auth-guard.service';
import { Breadcrumb } from '../shared/models/breadcrumb';

const routes: Routes = [
	{
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LayoutComponent,
        children : [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard],  data: {
                breadcrumbs: [
                  new Breadcrumb("Home", "/home")
                ]
              } },
            { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
            { path: 'forms', component: FormsComponent, canActivate: [AuthGuard] },
            { path: 'tables', component: TablesComponent, canActivate: [AuthGuard]  },
            { path: 'dialog', component: DialogComponent, canActivate: [AuthGuard]  },
            { path: 'wizard', component: WizardComponent,canActivate: [AuthGuard]  },
            { path: 'otherElements', component: OtherElementsComponent, canActivate: [AuthGuard]  },
            { path: 'datatables', component: DatatablesComponent, canActivate: [AuthGuard]  },
            { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]  },
            { path: 'grid-system', component: GridSystemComponent, canActivate: [AuthGuard]  },
            { path: 'user', component: UserComponent, canActivate: [AuthGuard],
                data: {
                breadcrumbs: [
                  new Breadcrumb("Home", "/home")
                ]
              } 
            },
            { path: 'role', component: RoleComponent,canActivate: [AuthGuard]  },
            { path: 'products', component: ProductsComponent,canActivate: [AuthGuard]  },
            { path: 'products/view/:id', component: ViewProductComponent,canActivate: [AuthGuard]  },
            { path: 'productitems', component: ProductItemComponent, canActivate: [AuthGuard]  },
            { path: 'customers', component: CustomersComponent, canActivate: [AuthGuard]  },
            { path: 'customers/add', component: AddCustomerComponent,canActivate: [AuthGuard]  },
            { path: 'customers/edit/:id', component: AddCustomerComponent,canActivate: [AuthGuard]  },
            { path: 'customers/view/:id', component: ViewCustomerComponent, canActivate: [AuthGuard]  },
            { path: 'salesorders', component:SalesOrderComponent, canActivate: [AuthGuard] },
            { path: 'salesorders/add', component:CreateSalesOrderComponent, canActivate: [AuthGuard] },
            { path: 'salesorders/edit', component: CreateSalesOrderComponent ,canActivate: [AuthGuard] },
            { path: 'salesorders/createinvoice', component: CreateInvoiceComponent, canActivate: [AuthGuard]  },
            { path: 'packages', component:PackagesComponent, canActivate: [AuthGuard] },
            { path: 'packages/createshipment', component:CreateShipmentComponent, canActivate: [AuthGuard] },
            { path: 'packages/add', component:AddPackageComponent, canActivate: [AuthGuard],
             data: {
                breadcrumbs: [
                  new Breadcrumb("Home", "/home")
                ]
              }  
            },
            { path: 'invoices', component:InvoicesComponent, canActivate: [AuthGuard], 
            data: {
                breadcrumbs: [
                  new Breadcrumb("Home", "/home")
                ]
              }  
            },
            { path: 'invoices/printinvoice', 
            component: PrintInvoiceComponent, 
            canActivate: [AuthGuard],
            data: {
                breadcrumbs: [
                  new Breadcrumb("Home", "/home")
                ]
              }  
            },
        ]
    },
    {
       path: 'login',
       component: LoginComponent
    },
    {
       path: 'register',
       component: RegisterComponent
    },
    {
       path: 'forgot-password',
       component: ForgotPasswordComponent
    },
    {
       path: 'error',
       component: ErrorComponent
    },
    {
        path: '**',
        component: ErrorComponent
     }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
