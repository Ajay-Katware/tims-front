import { EventCategorytype } from "./event-categorytype";

export class EventCategory{
    totalRecords:string;
    pagenumber:number;
    offset:number;
    page:number;
    maxlimit:number;
    leftrec:number;
    data:EventCategorytype[];
    constructor(){

    }
}