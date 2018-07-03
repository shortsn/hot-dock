import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { QueryParams } from './model';
import { dispatch } from '@angular-redux/store';
import { DockerActions } from '../../../store/data/docker/actions';
import { ContainerCreateOptions } from 'dockerode';
import { getPath } from '../../../store/controls/forms/model';
import { FormsActions } from '../../../store/controls/forms/actions';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateContainerWizardComponent implements OnInit, OnDestroy {

  readonly statePath = getPath(CreateContainerWizardComponent.name);
  readonly containerOptions = new FormGroup({
    Image: new FormControl('', Validators.required)
  });

  @ViewChild('wizard') wizard: ClrWizard;
  @ViewChild('options') optionsPage: ClrWizardPage;

  @dispatch() readonly createDockerContainer = (options: ContainerCreateOptions) =>
    DockerActions.DOCKER_CREATE_CONTAINER(options)

  @dispatch() readonly clearState = () =>
    FormsActions.FORMS_CLEAR_STATE(CreateContainerWizardComponent.name)

  public get open(): boolean {
    return true;
  }
  public set open(value: boolean) {
    if (value) { return; }
    this._router.navigate(['.', { outlets: { modal: null } }], { relativeTo: this._route.parent });
  }

  constructor(private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    const queryParams = this._route.snapshot.queryParams as QueryParams;

    if (queryParams.imageId !== undefined) {
      setTimeout(() => this.containerOptions.patchValue({
        Image: queryParams.imageId
      }), 0);
    }
  }

  ngOnDestroy(): void {
    this.clearState();
  }

}
