import { ProductItem } from "./product-item";

export class Product {
    id: number;
    productCode: string;
    productName: string;
    productDescription: string;
    unit: string;
    manufacturer: string;
    brand: string;
    sellingPrice: number;
    purchasePrice: number;
    openingStock: number;
    reorderLevel: string;

    constructor(){
    }
}
