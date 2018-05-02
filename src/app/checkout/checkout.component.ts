import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { Global } from '../core/global.model';
import { Contact } from './../core/contact.model';
import { Address } from './../core/address.model';
import { Payment } from './../core/payment.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public contact: Contact;
  public shipping: Address;
  public billing: Address;
  public payment: Payment;

  public addressControl: FormControl;

  @ViewChild("shipAddrLine1")
  public shipAddressElementRef: ElementRef;
  @ViewChild("billAddrLine1")
  public billAddressElementRef: ElementRef;

  constructor(
    private global: Global,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    //
    this.contact = new Contact({});
    //
    this.shipping = new Address({});
    //
    this.billing = new Address({});
    //
    this.payment = new Payment({});

    //create addressControl FormControl
    this.addressControl = new FormControl();
  }

  loadAddressInfo(code: string, searchElementRef: ElementRef, firstName?: string, lastName?: string): void {

    let objAddress: Address = new Address({});

    if (firstName) {
      objAddress.firstName = firstName;
    }

    if (lastName) {
      objAddress.lastName = lastName;
    }

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // Get each component of the address from the place details
          // and fill the corresponding field on the form.
          for (var i = 0; i < place.address_components.length; i++) {
            let address = place.address_components[i];
            let addressType = address.types[0];
            switch (addressType) {
              case 'street_number': {
                objAddress.addrLine1 = address.long_name;
                break;
              }
              case 'route': {
                objAddress.addrLine1 += ' ' + address.long_name;
                break;
              }
              case 'locality': {
                objAddress.addrLine2 = address.long_name;
                break;
              }
              case 'postal_town': {
                objAddress.city = address.long_name;
                break;
              }
              case 'postal_code': {
                objAddress.postcode = address.long_name;
                break;
              }
            }
          }

          if (code == 'SHIP') {
            //
            this.shipping._id = objAddress._id;
            this.shipping.firstName = objAddress.firstName;
            this.shipping.lastName = objAddress.lastName;
            this.shipping.addrLine1 = objAddress.addrLine1;
            this.shipping.addrLine2 = objAddress.addrLine2;
            this.shipping.city = objAddress.city;
            this.shipping.postcode = objAddress.postcode;
            this.shipping.save = objAddress.save;
          }

          if (code == 'BILL') {
            //
            this.billing = objAddress;
          }

        });
      });
    });
  }

  onSubmit(form: NgForm): void {
    //
    if (this.shipping) {
      //
      this.global.shipping = new Address({})
      //
      this.global.shipping._id = this.shipping._id;
      this.global.shipping.firstName = this.shipping.firstName;
      this.global.shipping.lastName = this.shipping.lastName;
      this.global.shipping.addrLine1 = this.shipping.addrLine1;
      this.global.shipping.addrLine2 = this.shipping.addrLine2;
      this.global.shipping.city = this.shipping.city;
      this.global.shipping.postcode = this.shipping.postcode;
      this.global.shipping.save = this.shipping.save;
    }
    //
    if (this.billing) {
      //
      this.global.billing = new Address({})
      //
      this.global.billing._id = this.billing._id;
      this.global.billing.addrLine1 = this.billing.addrLine1;
      this.global.billing.addrLine2 = this.billing.addrLine2;
      this.global.billing.city = this.billing.city;
      this.global.billing.postcode = this.billing.postcode;
      this.global.billing.save = this.billing.save;
    }

    //
    form.reset();
  }

  getFocus(eleId: string): void {
    document.getElementById(eleId).focus();
  }

  expInsert(model: Payment, string: string): void {
    if (string.length == 2) {
      model.expiry = model.expiry + '/';
    }
  }

  onKey(this: any, event: any): void {

    // key code for Enter / CR
    if (event.keyCode == 13) {
      let attId = event.srcElement.getAttribute('id');

      switch (attId) {
        case 'errMsg_cpReq':
        case 'errMsg_cpInv': {
          this.getFocus('contactPoint');
          break;
        }
        case 'errMsg_fnReq':
        case 'errMsg_fnMinLgt':
        case 'errMsg_fnMaxLgt': {
          this.getFocus('firstName');
          break;
        }
        case 'errMsg_lnReq':
        case 'errMsg_lnMinLgt':
        case 'errMsg_lnMaxLgt': {
          this.getFocus('lastName');
          break;
        }
        case 'errMsg_a1Req': {
          this.getFocus('addrLine1');
          break;
        }
        case 'errMsg_pcReq':
        case 'errMsg_pcInv': {
          this.getFocus('postcode');
          break;
        }
        case 'errMsg_cpReq':
        case 'errMsg_cpInv': {
          this.getFocus('contactPoint');
          break;
        }
        case 'errMsg_expReq':
        case 'errMsg_expInv': {
          this.getFocus('expiry');
          break;
        }
        case 'errMsg_cvvReq':
        case 'errMsg_cvvInv': {
          this.getFocus('cvv');
          break;
        }
      }
    }
  }

}
