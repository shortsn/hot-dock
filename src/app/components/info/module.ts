import { HomeComponent } from './home/component';
import { InfoRoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CoreModule,
    InfoRoutingModule
  ]
})
export class InfoModule {}
