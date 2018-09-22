import { ProductItem } from "./product-item";

export class SalesItem {
    id:number;
    itemid:ProductItem;
    productid:number;
    quantity:number;
    rate:number;
    discount:number;
    amount:number;
    salesorderid:number;
    productname:string;
    constructor(){

    }
}
