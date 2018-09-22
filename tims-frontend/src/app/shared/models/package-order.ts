import { PackageItem } from "./package-item";
import { SalesOrder } from "./sales-order";

export class PackageOrder {
    id: number;
    packageno: string;
    packagedate: Date;
    packagenotes: string;
    totalqty: number;
    shipmentno: string;
    shipdate: Date;
    carrier: string;
    tracking: string;
    shipnotes: string;
    delivered: string;
    packageItemsList: PackageItem[];
    salesorderid: SalesOrder;

    constructor(){

    }
}
