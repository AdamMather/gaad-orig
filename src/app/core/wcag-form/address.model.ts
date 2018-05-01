 export class Address {

     public _id: string;
     public addrLine1: string;
     public addrLine2: string;
     public addrLine3: string;
     public city: string;
     public county: string;
     public postcode: string;

     constructor(input: Object) {
         this._id = input['_id'];
         this.addrLine1 = input['addrLine1'];
         this.addrLine2 = input['addrLine2'];
         this.addrLine3 = input['addrLine3'];
         this.city = input['city'];
         this.county = input['county'];
         this.postcode = input['postcode'];
     }
 }