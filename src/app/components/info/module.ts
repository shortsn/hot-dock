import { DockerImagesComponent } from './dockerImages/component';
import { InfoRoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/module';
import { FileSizePipe } from './fileSize/pipe';
import { DockerContainersComponent } from './dockerContainers/component';
import { ShortHashPipe } from './shortHashId/pipe';
import { DashboardComponent } from './dashboard/component';

@NgModule({
  declarations: [
    DashboardComponent,
    DockerImagesComponent,
    DockerContainersComponent,
    FileSizePipe,
    ShortHashPipe
  ],
  imports: [
    CoreModule,
    InfoRoutingModule
  ]
})
export class InfoModule {}
