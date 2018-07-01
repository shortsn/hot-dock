import { NgModule } from '@angular/core';
import { CoreModule } from '../core/module';
import { CreateContainerWizardComponent } from './createWizard/component';

@NgModule({
  declarations: [
    CreateContainerWizardComponent,
  ],
  imports: [
    CoreModule
  ],
  exports: [
    CreateContainerWizardComponent
  ]
})
export class ContainerModule {}
