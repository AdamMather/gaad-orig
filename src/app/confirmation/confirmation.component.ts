import { Component, OnInit } from '@angular/core';

import { Global } from './../core/global.model';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private global: Global
  ) { }

  ngOnInit() {
    console.log('confirmation');
    console.log('global shipping: ' + JSON.stringify(this.global.shipping));
    console.log('global billing: ' + JSON.stringify(this.global.billing));
  }

}
