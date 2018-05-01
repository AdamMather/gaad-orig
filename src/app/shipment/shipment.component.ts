import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { Address } from './../core/address.model';
import { Global } from '../core/global.model';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.css']
})
export class ShipmentComponent implements OnInit {

  public shipping: Address;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("addrLine1")
  public searchElementRef: ElementRef;

  constructor(
    private global: Global,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    //
    this.shipping = new Address({});
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

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
                this.shipping.addrLine1 = address.long_name;
                break;
              }
              case 'route': {
                this.shipping.addrLine1 += ' ' + address.long_name;
                break;
              }
              case 'locality': {
                this.shipping.addrLine2 = address.long_name;
                break;
              }
              case 'postal_town': {
                this.shipping.city = address.long_name;
                break;
              }
              case 'postal_code': {
                this.shipping.postcode = address.long_name;
                break;
              }                            
            }
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });

  }

  onSubmit(newForm: NgForm): void {
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
    //
    newForm.reset();
    //
    this.shipping = null;
  }

  getFocus(eleId: string): void {
    document.getElementById(eleId).focus();
  }

  onKey(this: any, event: any): void {

    // key code for Enter / CR
    if (event.keyCode == 13) {
      let attId = event.srcElement.getAttribute('id');

      switch (attId) {
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
      }
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

}
