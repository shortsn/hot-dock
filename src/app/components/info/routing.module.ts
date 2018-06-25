import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockerImagesComponent } from './dockerImages/component';
import { DockerContainersComponent } from './dockerContainers/component';
import { DashboardComponent } from './dashboard/component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'images', component: DockerImagesComponent },
  { path: 'containers', component: DockerContainersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfoRoutingModule { }
