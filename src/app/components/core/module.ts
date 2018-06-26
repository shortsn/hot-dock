import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons } from '@clr/icons';
import { TranslateModule } from '@ngx-translate/core';
import { ShapeHotDock } from '../icons/hot-dock';
import { DockerErrorComponent } from './dockerError/component';
import { ExternalHrefDirective } from './externalHref/directive';
import { LayoutComponent } from './layout/component';

import '@clr/icons/shapes/technology-shapes';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/media-shapes';

ClarityIcons.add({
  'hot-dock': ShapeHotDock,
});

@NgModule({
  declarations: [
    LayoutComponent,
    DockerErrorComponent,
    ExternalHrefDirective
  ],
  imports: [
    CommonModule,
    ClarityModule,
    TranslateModule,
    RouterModule
  ],
  exports: [
    ExternalHrefDirective,
    LayoutComponent,
    CommonModule,
    ClarityModule,
    TranslateModule,
    RouterModule
  ]
})
export class CoreModule { }
