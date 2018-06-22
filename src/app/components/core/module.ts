import { ClarityModule } from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/component';
import { RouterModule } from '@angular/router';

import { ClarityIcons } from '@clr/icons';
import { ClrShapeBundle } from '@clr/icons/shapes/technology-shapes';
import { DockerErrorComponent } from './docker-error/component';

ClarityIcons.add({
  ClrShapeBundle
});

@NgModule({
  declarations: [
    LayoutComponent,
    DockerErrorComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    LayoutComponent,
    CommonModule,
    ClarityModule,
    TranslateModule,
    RouterModule
  ]
})
export class CoreModule {}
