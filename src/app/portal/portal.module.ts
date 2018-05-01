import { NgModule } from "@angular/core";
import { AgmCoreModule } from '@agm/core';

const googleMapsParams = {
    apiKey: 'AIzaSyDK8zuVo2bqA-K2PX08tcZUQgFmY5-fTHg',
    libraries: ["places"],
    region: 'UK'
  };

@NgModule({
    imports: [
        AgmCoreModule.forRoot(googleMapsParams),
    ]
})

export class PortalModule { }