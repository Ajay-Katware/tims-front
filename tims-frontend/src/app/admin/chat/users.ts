import { AddressModel } from "./address-model";

export class Users{
    id: number;
    name: string;
    username: string;
    email: string;
    address: AddressModel;
    phone: string;
    website: string;
    company: any;

  constructor(){

  }
}