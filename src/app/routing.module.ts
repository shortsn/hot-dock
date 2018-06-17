import { HomeComponent } from './components/home/component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:
    [
      { path: '', redirectTo: 'system', pathMatch: 'full' },
      { path: 'system', component: HomeComponent },
      { path: 'test', component: HomeComponent }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
