import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrWizard, ClrWizardPage } from '@clr/angular';
import { Observable } from 'rxjs/Observable';
import { QueryParams } from './model';
import { dispatch } from '@angular-redux/store';
import { DockerActions } from '../../../store/data/docker/actions';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateContainerWizardComponent implements OnInit {

  imageId: string;

  @ViewChild('wizard') wizard: ClrWizard;
  @ViewChild('image') image: ClrWizardPage;
  @ViewChild('parameters') parameters: ClrWizardPage;

  @dispatch() readonly createDockerContainer = (imageId: string) =>
    DockerActions.DOCKER_CREATE_CONTAINER({ imageId })

  public get open(): boolean {
    return true;
  }
  public set open(value: boolean) {
    if (value) { return; }
    this._router.navigate(['.', { outlets: { modal: null } }], { relativeTo: this._route.parent });
  }

  constructor(private _router: Router, private _route: ActivatedRoute) {
    const queryParams = _route.snapshot.queryParams as QueryParams;
    this.imageId = queryParams.imageId;
  }

  ngOnInit() {
    if (this.imageId !== undefined) {
      this.parameters.makeCurrent();
    }
  }

}
