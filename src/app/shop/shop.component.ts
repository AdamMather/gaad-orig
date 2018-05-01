import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';

import { Products } from '../core/products.model';
import { Global } from '../core/global.model';
import { ProductsService } from '../shared/service/products.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  public records: Observable<Array<Products>>;

  constructor(
    private global: Global,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    
    this.global.products = this.route.snapshot.data['products'];

  }

}
