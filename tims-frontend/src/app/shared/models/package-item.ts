import { ProductItem } from "./product-item";

export class PackageItem {
    id: number;
    itemid: ProductItem;
    qtyordered: number;
    qtypacked: number;
    qtytopack: number;
    packageid: number;
    productname:string;
    constructor(){

    }
}
