import { Role } from "./role";

export class User {
    
    public id:number;
    public firstname:string;
	public lastname:string;
	public useremail:string;
	public userage:number;
	public userpwd:string;
	public userenabled:number;
	public confirmationtoken:string;
	public resettoken:string;
	public createdon:Date;
	public lastlogin:Date;
    public contactno:string;
	public picture:string;
    public tempactive:number;
    public username:string;
    public streetno:string;
    public streetname:string;
    public city:string;
    public postalcode:string;
    public province:string;
    public country:string;
    public gender:string;
    public userrole:Role;
    public filename:string;
    public filetype:string;

    constructor(){}
}