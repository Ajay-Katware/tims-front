import { EmailList } from "./email-list";

export class CustomerEmail {
    public subject:string;
    public sendToEmails:EmailList[];
    public ccEmails:EmailList[];
    public editorHtml:string;
    constructor(){

    }
}
