import { SettingsRoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/module';
import { SettingsComponent } from './component';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CoreModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule {}
