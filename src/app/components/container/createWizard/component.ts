import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClrWizard } from '@clr/angular';
import { Observable } from 'rxjs/Observable';
import { QueryParams } from './model';
import { dispatch } from '@angular-redux/store';
import { DockerActions } from '../../../store/data/docker/actions';

@Component({
  templateUrl: './component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateContainerWizardComponent implements OnInit {

  readonly queryParams$: Observable<QueryParams>;

  @ViewChild('wizardmd') wizard: ClrWizard;

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
    this.queryParams$ = _route.queryParams;
  }

  ngOnInit() {
  }

}
