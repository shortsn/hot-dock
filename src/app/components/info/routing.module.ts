import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockerImagesComponent } from './dockerImages/component';
import { DockerContainersComponent } from './dockerContainers/component';
import { DashboardComponent } from './dashboard/component';
import { RecentDockerEventsComponent } from './recentDockerEvents/component';
import { CreateContainerWizardComponent } from '../container/createWizard/component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    children: [
      { path: '', component: DashboardComponent },
      { path: 'create-container', component: CreateContainerWizardComponent, outlet: 'modal' }
    ]
  },
  { path: 'images', component: DockerImagesComponent },
  { path: 'containers', component: DockerContainersComponent },
  { path: 'recentEvents', component: RecentDockerEventsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfoRoutingModule { }
