import { SalesItemDto } from "./sales-item-dto";


export class SalesOrderDto {
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
    customerid:number;
    packaged: string;
    shiped: string;
    invoiceno: string;
    salesItemsCollection:SalesItemDto[];

    constructor(){

    }
}
