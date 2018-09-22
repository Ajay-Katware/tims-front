import { ProductItem } from "./product-item";

export class SalesItemDto {
    id: number;
    barcode: string;
    itemid:ProductItem;
    productid:number;
    productname: string;
    quantity: number;
    unit: string;
    rate: string;
    discount: number;
    amount: string;

    constructor(){

    }
}
