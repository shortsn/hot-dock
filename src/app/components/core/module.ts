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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgReduxFormConnectModule } from '@angular-redux/form';

import '@clr/icons/shapes/technology-shapes';
import '@clr/icons/shapes/essential-shapes';
import '@clr/icons/shapes/media-shapes';
import { ShapeHotDockSad } from '../icons/hot-dock-sad';

ClarityIcons.add({
  'hot-dock': ShapeHotDock,
  'hot-dock-sad': ShapeHotDockSad,
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
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxFormConnectModule
  ],
  exports: [
    ExternalHrefDirective,
    LayoutComponent,
    CommonModule,
    ClarityModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgReduxFormConnectModule
  ]
})
export class CoreModule { }
