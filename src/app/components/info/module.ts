import { DockerImagesComponent } from './dockerImages/component';
import { InfoRoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/module';

@NgModule({
  declarations: [
    DockerImagesComponent,
  ],
  imports: [
    CoreModule,
    InfoRoutingModule
  ]
})
export class InfoModule {}
