import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PortalComponent } from './../portal/portal.component';
import { FeatureComponent } from './../feature/feature.component';
import { ShopComponent } from './../shop/shop.component';
import { StoreComponent } from './../store/store.component';
import { BasketComponent } from './../basket/basket.component';
import { ContactComponent } from './../contact/contact.component';
import { ShipmentComponent } from './../shipment/shipment.component';
import { PaymentComponent } from './../payment/payment.component';
import { ConfirmationComponent } from './../confirmation/confirmation.component';
import { WcagFormComponent } from './../wcag-form/wcag-form.component';

// Resolve
import { ProductsResolve } from '../shared/resolve/products.resolve.service';

// define routes
const routes: Routes = [
  { path: 'portal', component: PortalComponent },
  { path: 'feature', component: FeatureComponent },
  { path: 'shop', component: ShopComponent, resolve: { products: ProductsResolve } },
  { path: 'store/:item', component: StoreComponent, resolve: { products: ProductsResolve } },
  { path: 'form', component: WcagFormComponent, resolve: { products: ProductsResolve } },
  { path: 'basket', component: BasketComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'shipment', component: ShipmentComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'confirmation', component: ConfirmationComponent, resolve: { products: ProductsResolve } }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
