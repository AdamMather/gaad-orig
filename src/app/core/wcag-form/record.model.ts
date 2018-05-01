import { Address } from './address.model';

export class Record {

    public _id: string;
    public firstName: string;
    public lastName: string;
    public emailAddress: string;
    public website: string;
    public landline: string;
    public mobile: string;

    constructor(input: Object) {
        this._id = input['_id'];
        this.firstName = input['firstName'];
        this.lastName = input['lastName'];
        this.emailAddress = input['emailAddress'];
        this.emailAddress = input['website'];
        this.landline = input['landline'];
        this.mobile = input['mobile']; 

    }
 }