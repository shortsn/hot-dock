import { DockerImagesComponent } from './dockerImages/component';
import { InfoRoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/module';
import { FileSizePipe } from './fileSize/pipe';
import { DockerContainersComponent } from './dockerContainers/component';
import { ShortHashPipe } from './shortHashId/pipe';
import { DashboardComponent } from './dashboard/component';
import { RecentDockerEventsComponent } from './recentDockerEvents/component';
import { ContainerModule } from '../container/module';

@NgModule({
  declarations: [
    DashboardComponent,
    DockerImagesComponent,
    DockerContainersComponent,
    RecentDockerEventsComponent,
    FileSizePipe,
    ShortHashPipe
  ],
  imports: [
    CoreModule,
    ContainerModule,
    InfoRoutingModule
  ]
})
export class InfoModule {}
