import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { Global } from '../core/global.model';
import { Address } from './../core/address.model';
import { Payment } from './../core/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  public payment: Payment;
  public billing: Address;

  public searchControl: FormControl;

  @ViewChild("addrLine1")
  public searchElementRef: ElementRef;

  constructor(
    private global: Global,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.payment = new Payment({});
    this.billing = new Address({});

    //create search FormControl
    this.searchControl = new FormControl();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
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
                    this.billing.addrLine1 = address.long_name;
                    break;
                  }
                  case 'route': {
                    this.billing.addrLine1 += ' ' + address.long_name;
                    break;
                  }
                  case 'locality': {
                    this.billing.addrLine2 = address.long_name;
                    break;
                  }
                  case 'postal_town': {
                    this.billing.city = address.long_name;
                    break;
                  }
                  case 'postal_code': {
                    this.billing.postcode = address.long_name;
                    break;
                  }               
                }
              }
            });
          });
        });

  }

  onSubmit(newForm: NgForm): void {
    //
    this.global.billing = new Address({})
    
    this.global.billing._id = this.billing._id;
    this.global.billing.addrLine1 = this.billing.addrLine1;
    this.global.billing.addrLine2 = this.billing.addrLine2;
    this.global.billing.city = this.billing.city;
    this.global.billing.postcode = this.billing.postcode;
    this.global.billing.save = this.billing.save;
    //
    newForm.reset();
    // causes error
    this.billing = null;
  }

  getFocus(eleId: string): void {
    document.getElementById(eleId).focus();
  }

  sayHello(): void {
    console.log('hello!');
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
