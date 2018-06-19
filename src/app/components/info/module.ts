import { DockerImagesComponent } from './dockerImages/component';
import { InfoRoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/module';
import { FileSizePipe } from './fileSize/pipe';

@NgModule({
  declarations: [
    DockerImagesComponent,
    FileSizePipe
  ],
  imports: [
    CoreModule,
    InfoRoutingModule
  ]
})
export class InfoModule {}
