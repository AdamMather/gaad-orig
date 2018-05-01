import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { FeatureComponent } from './feature/feature.component';
import { StoreComponent } from './store/store.component';
import { BasketComponent } from './basket/basket.component';
import { ContactComponent } from './contact/contact.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { PaymentComponent } from './payment/payment.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

import { Global } from './core/global.model';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { PortalModule } from './portal/portal.module';
import { ShopComponent } from './shop/shop.component';

import { ProductsService } from './shared/service/products.service';
import { ProductsResolve } from './shared/resolve/products.resolve.service';
import { WcagFormComponent } from './wcag-form/wcag-form.component';

const googleMapsParams = {
  apiKey: 'AIzaSyDK8zuVo2bqA-K2PX08tcZUQgFmY5-fTHg',
  libraries: ["places"],
  region: 'UK'
};

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    FeatureComponent,
    ShopComponent,
    StoreComponent,
    BasketComponent,
    ContactComponent,
    ShipmentComponent,
    PaymentComponent,
    ConfirmationComponent,
    WcagFormComponent
  ],
  imports: [
    // this is required for the contact page - not sure why it isn't inherited from ContactModule
    AgmCoreModule.forRoot(googleMapsParams),
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PortalModule
  ],
  providers: [
    Global,
    ProductsService,
    ProductsResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
