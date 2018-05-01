import { Injectable } from '@angular/core';
import { Address } from './address.model';
import { Products } from './products.model';
import { ProductItem } from './productItem.model';

@Injectable()
export class Global {

    public path: string;                // breadcrumb navigation

    public products: Array<Products>;   // product range
    public productItem: ProductItem;    // basket item

    public basket: Array<ProductItem>; // array of basket items
    public basketCost: number;
    public shippingCost: number;

    public shipping: Address;
    public billing: Address;

    constructor() {

        this.shippingCost = 3;
    }
    
}