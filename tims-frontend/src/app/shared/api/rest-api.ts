export class RestApi {

    public readonly API_URL = 'http://localhost:8083';
    //public readonly API_URL = 'http://192.168.15.116:8080/timsrest/';

    //LOGIN MODULE API
    public readonly LOGIN_URL = this.API_URL + '/login';
    public readonly UPDATEPWD_URL = this.API_URL + '/update';
    public readonly FORGOT_URL = this.API_URL + '/forgot';


    //Dashboard Counterss
    public readonly DASHBOARD_URL = this.API_URL + '/dashboard';
    public readonly COUNTER_URL = this.DASHBOARD_URL + '/counters';

    //Role URL
    public readonly ROLE_URL = this.API_URL + '/roles';
    public readonly CHECKROLEBYNAME_URL = this.ROLE_URL + '/checkRoleByName';

    //USER URL
    public readonly USER_URL = this.API_URL + '/users';
    public readonly USER_IMAGE_URL = this.USER_URL + '/uploadImage';

    public readonly CHECKUSERBYUSERNAME_URL = this.USER_URL + '/checkUserByUsername';
    public readonly CHECKUSERBYEMAIL_URL = this.USER_URL + '/checkUserByEmail';
    public readonly CHECKUSERBYTOKEN_URL = this.USER_URL + '/checkUserByToken';
    public readonly SETPWD_URL = this.USER_URL + '/setpassword';

    //PRODUCT URL
    public readonly PRODUCT_URL = this.API_URL + '/products';

    //PRODUCT ITEM URL
    public readonly PRODUCTITEM_URL = this.API_URL + '/productitems';

    //
    public readonly CUSTOMER_URL = this.API_URL + '/customers';

    //PRODUCT URL
    public readonly SALESORDER_URL = this.API_URL + '/salesorders';
    public readonly NEXTSONUMBER_URL = this.SALESORDER_URL + '/nextsonumber';
    public readonly NEXTINVNUMBER_URL = this.SALESORDER_URL + '/nextinvoicenumber';
    public readonly CREATEINVOICE_URL = this.SALESORDER_URL + '/createinvoice';

    public readonly INVOICES_URL = this.API_URL + '/invoices';

    public readonly PACKAGEORDER_URL = this.API_URL + '/packageorder';

    public readonly NEXTPKGNUMBER_URL = this.PACKAGEORDER_URL + '/nextpkgnumber';

    public readonly SHIPORDER_URL = this.API_URL + '/packageorder';
    public readonly NEXTSHIPNUMBER_URL = this.SHIPORDER_URL + '/nextshipnumber';

    public readonly PACKAGEITEM_URL = this.API_URL + '/packageitems';

    constructor() {

    }


}
