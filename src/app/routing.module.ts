import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/core/layout/component';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:
    [
      { path: '', redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', loadChildren: 'app/components/info/module#InfoModule' },
      { path: 'test', loadChildren: 'app/components/info/module#InfoModule' }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
