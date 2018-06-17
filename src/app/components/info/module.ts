import { HomeComponent } from './home/component';
import { ClarityModule } from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InfoRoutingModule } from './routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ClarityModule,
    TranslateModule,
    InfoRoutingModule
  ]
})
export class InfoModule {}
