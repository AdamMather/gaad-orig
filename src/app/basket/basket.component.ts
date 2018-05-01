import { Component, ElementRef, HostListener, OnInit, ViewChild, Input } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Global } from './../core/global.model';
import { ProductItem } from './../core/productItem.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  public productItem: ProductItem;
  public basket: Array<ProductItem>;
  //public basketCost: number;
  public shippingCost: number;
  public filter: Array<ProductItem>;

  public quantityNumber: number;

  constructor(
    private global: Global,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    //
    this.global.path = this.router.url;

    //
    if (this.global.basket == null) {
      this.quantityNumber = 0;
      // initialize basket array
      this.global.basket = [];
      // initialize global basket cost
      this.global.basketCost = 0;

      // create some static data
      this.addProductItem("1", "1976 501 Jeans", 180, 3);
      this.addProductItem("2", "501 Original Fit Jeans", 65, 2);
      this.addProductItem("3", "501 Skinny Jeans", 85, 4);

      // calculate total cost of items
      this.global.basket.map(item => this.global.basketCost = this.global.basketCost + item.quantityCost);
    }

    this.shippingCost = 3;

    // this is an example of data being displayed via Activated Route  
    //let message = this.route.snapshot.data;
    //console.log(JSON.stringify(message));

    //example of displaying all json records
    //console.log('records: ' + JSON.stringify(this.global.basket));

    //example of displaying all json records filtered by attribute
    //this.filter = this.global.basket.filter(item => item.productPrice <= 100);
    //console.log('filtered records: ' + JSON.stringify(this.filter));

  }

  addProductItem(_id: string, name: string, price: number, quantity: number): void {

    //initialize product items
    this.productItem = new ProductItem({});
    //
    this.productItem._id = _id;
    this.productItem.productName = name;
    this.productItem.productPrice = price;
    this.productItem.quantity = quantity;
    this.productItem.quantityCost = price * quantity;
    this.global.basket.push(this.productItem);
  }

  removeProductItem(productItem: ProductItem): void {

    let index = this.global.basket.indexOf(productItem);
    this.global.basket.splice(index, 1);

    // re-calculate total cost of items
    this.global.basketCost = this.global.basketCost - productItem.quantityCost;
    // reset shipping cost if basket cost is zero
    this.shippingCost = (this.global.basketCost == 0) ? 0 : this.shippingCost;

    //inject dialog instruction
    let element = document.getElementById('status');
    element.innerHTML = "the product " + productItem.productName + ' and associated quantity has been removed from the shopping basket';
    element.focus();

  }

  adjustQuantityValue(productItem: ProductItem, operator: boolean): void {

    if (productItem) {
      if (operator) {
        // increase quantity by one
        productItem.quantity = productItem.quantity + 1;
      } else {
        // decrease quantity by one
        if (productItem.quantity > 0) {
          productItem.quantity = productItem.quantity - 1;
        }
      }

      // subtract the former item quantity cost from basket cost
      this.global.basketCost = this.global.basketCost - productItem.quantityCost;
      // multiply price by quantity to obtain the quantity cost
      productItem.quantityCost = productItem.productPrice * productItem.quantity;
      // add the updated item quantity cost to the basket cost
      this.global.basketCost = this.global.basketCost + productItem.quantityCost;
    }
  }

  createId(itemId: string): string {

    return "basket-item-" + itemId + "-quantity-desc";
  }

  getBasketContents(): string {

    let stringBuilder: string = '';
    let numOfItems: string = 'you currently have #num items in the shopping basket';
    let basketCost: string = 'at a total basket cost of ' + this.global.basketCost + ' pounds';
    let totalCost: string = 'the shipping cost is ' + this.shippingCost + ' pounds, bringing the total cost to ' + this.global.basketCost + this.shippingCost + ' pounds';

    if (this.global.basket.length == 0) {
      stringBuilder = 'the basket is empty';
    } else {
      stringBuilder = 'there ';
      this.global.basket.map((item, index) => {
        if (index == 0) {
          stringBuilder = (item.quantity == 1) ? stringBuilder + 'is ' : stringBuilder + 'are ';
        }
        if (this.global.basket.length != 1 && index == this.global.basket.length - 1) stringBuilder = stringBuilder + ' and ';
        stringBuilder = stringBuilder + item.quantity + ' ';
        stringBuilder = (item.quantity == 1) ? stringBuilder + 'item ' : stringBuilder + 'items ';
        stringBuilder = stringBuilder + ' of ' + item.productName;

        if (index < this.global.basket.length - 2) stringBuilder = stringBuilder + ', ';
      });
      stringBuilder = stringBuilder + ' ' + basketCost + ' ' + totalCost;
    };
    //
    return stringBuilder;
  }

  getNumberOfProductListings(): string {

    let stringBuilder: string = 'there ';

    stringBuilder = (this.global.basket.length == 1) ? stringBuilder + 'is ' : stringBuilder + 'are ';
    stringBuilder = (this.global.basket.length != 0) ? stringBuilder + this.global.basket.length + ' ' : stringBuilder + 'no ';
    stringBuilder = (this.global.basket.length == 1) ? stringBuilder + 'product ' : stringBuilder + 'products ';
    stringBuilder = stringBuilder + 'listed in the basket';
    return stringBuilder;
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: any, item?: ProductItem): void {

    console.log(event.keyCode);
    let element = document.getElementById('status');
    let attId = event.srcElement.getAttribute('id');

    // key code for Enter / CR
    if (event.keyCode == 66 && event.altKey) {
      console.log('you pressed key combination Alt+B');
      element.innerHTML = this.getBasketContents();
      element.focus();
    }

    if (event.keyCode == 78 && event.altKey) {
      console.log('you pressed key combination Alt+N');
      element.innerHTML = this.getNumberOfProductListings();
      element.focus();
    }


    if (event.keyCode == 13) {

      switch (attId) {
        case 'increment-value': {
          this.adjustQuantityValue(item, false);
          break;
        }
        case 'decrement-value': {
          this.adjustQuantityValue(item, true);
          break;
        }
      }
    }
  }
}
