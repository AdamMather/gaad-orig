import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Global } from './../core/global.model';
import { Products } from './../core/products.model';
import { ProductItem } from './../core/productItem.model';
import { ItemAttributes } from './../core/itemAttributes.model';

import { ProductsService } from '../shared/service/products.service';

import { containsTree } from '@angular/router/src/url_tree';
import { isNumber } from 'util';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  public basket: string;

  public item: Products;

  public waistData: any;
  public lengthData: any;
  public colourData: any;

  public jeanWaist: any;
  public jeanLength: any;
  public jeanColour: any;

  public waistValue: string;
  public lengthValue: string;
  public colourValue: string;

  public jeanImg: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private global: Global
  ) { }

  ngOnInit() {

    // get product range
    this.global.products = this.route.snapshot.data['products'];

    // retrieve the record identifier from the url parameter

    let itemId: number = this.getProductItem(this.router.url);

    // get product item by id
    this.item = this.global.products.find(item => (Number(item._id) === itemId));

    // get product metadata
    this.waistData = [24, 25, 26, 27, 28, 29, 30, 31];
    this.lengthData = [28, 30, 32, 34];

    this.colourData = ['Blue', 'Black'];

    this.basket = JSON.stringify(this.global.basket);
    if (this.global.basket == null) {
      // initialize basket array
      this.global.basket = [];
      // initialize global basket cost
      this.global.basketCost = 0;

      //
      this.getJeanWaist();
      //
      this.getLength();
      //
      this.getColour()
    }

  }

  getProductItem(url: string): number {

    let startPos: number = url.lastIndexOf('/') + 1;
    let endPos: number = url.length;
    let strNum: string = url.substring(startPos, endPos);

    return Number(strNum);
  }

  getJeanWaist() {
    this.jeanWaist = this.waistData;
  };

  getLength() {
    this.jeanLength = this.lengthData;
  };

  getColour() {
    this.jeanColour = this.colourData;
  };

  onChangeAttribute(attribute: string) {

    console.log('attribute value = ' + attribute);

  }

  addProductItem(_id: string, name: string, price: number, quantity: number): void {

    //initialize product items
    let productItem = new ProductItem({});
    //initialize product items
    let itemAttributes = new ItemAttributes({});
    // store item attributes
    itemAttributes.itemWaist = this.waistValue;
    itemAttributes.itemWaist = this.lengthValue;
    itemAttributes.itemWaist = this.colourValue;
    //
    productItem._id = _id;
    productItem.productName = name;
    productItem.productPrice = price;
    productItem.itemAttributes = itemAttributes;
    productItem.quantity = quantity;
    productItem.quantityCost = price;

    let rec: ProductItem = this.global.basket.find(x => (x.productName === productItem.productName));

    if (rec) {
      // re-calculate total cost of items
      this.global.basketCost = this.global.basketCost - rec.quantityCost;
      // increment item quantity
      rec.quantity = Number(rec.quantity) + quantity;
      // re-calulate quantity cost yielded from item price multiplied by incremented quantity
      rec.quantityCost = Number(rec.quantity * price);
      //update the basket cost
      this.global.basketCost = Number(this.global.basketCost + rec.quantityCost);
    } else {
      // add new item to basket
      this.global.basket.push(productItem);
      // update basket cost by item quantity cost
      this.global.basketCost = Number(this.global.basketCost + productItem.quantityCost);
    }
  }
}
