import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/core/layout/component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:
    [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', loadChildren: 'app/components/info/module#InfoModule' },
      { path: 'container', loadChildren: 'app/components/container/module#ContainerModule' },
      { path: 'settings', loadChildren: 'app/components/settings/module#SettingsModule' }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
