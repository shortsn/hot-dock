import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { QueryParams } from './model';
import { dispatch } from '@angular-redux/store';
import { DockerActions } from '../../../store/data/docker/actions';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateContainerWizardComponent implements OnInit {

  readonly containerOptions: FormGroup;

  @ViewChild('wizard') wizard: ClrWizard;
  @ViewChild('options') optionsPage: ClrWizardPage;

  @dispatch() readonly createDockerContainer = () =>
    DockerActions.DOCKER_CREATE_CONTAINER(this.containerOptions.value)

  public get open(): boolean {
    return true;
  }
  public set open(value: boolean) {
    if (value) { return; }
    this._router.navigate(['.', { outlets: { modal: null } }], { relativeTo: this._route.parent });
  }

  constructor(private _router: Router, private _route: ActivatedRoute, formBuilder: FormBuilder) {
    const queryParams = _route.snapshot.queryParams as QueryParams;

    this.containerOptions = formBuilder.group({
      Image: [queryParams.imageId, Validators.required ],
    });
  }

  ngOnInit() {
  }

}
