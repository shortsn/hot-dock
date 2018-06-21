import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DockerImagesComponent } from './dockerImages/component';
import { DockerContainersComponent } from './dockerContainers/component';

const routes: Routes = [
  { path: '', redirectTo: 'images', pathMatch: 'full' },
  { path: 'images', component: DockerImagesComponent },
  { path: 'containers', component: DockerContainersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfoRoutingModule { }
