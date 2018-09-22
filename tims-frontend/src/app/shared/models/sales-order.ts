import { Customer } from "./customer";
import { SalesItem } from "./sales-item";

export class SalesOrder {
    id:number;
    salesorderno:string;
    reference:string;
    orderdate:Date;
    expecteddate:Date;
    salesperson:string;
    shipvia:string;
    status:string;
    subtotal:number;
    tax:number;
    total:number;
    notes:string;
    terms:string;
    packaged: string;
    shiped: string;
    invoiceno: string;
    customerid:Customer;
    salesItemsCollection:SalesItem[];
    constructor(){

    }
}
