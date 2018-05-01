import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Global } from '../core/global.model';
import { Contact } from './../core/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contact: Contact;

  constructor(
    private global: Global
  ) { }

  ngOnInit() {

    this.contact = new Contact({});

  }

  onSubmit(newForm: NgForm): void {
    //

    //
    newForm.reset();
  }

  getFocus(eleId: string): void {
    document.getElementById(eleId).focus();
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
      }
    }
  }
}
