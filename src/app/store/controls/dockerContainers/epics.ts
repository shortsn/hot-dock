import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';

import { filter } from 'rxjs/operators';
import { DockerActions } from '../../data/docker/actions';

@Injectable()
export class DockerContainersEpics {

  loadContainers = (action$: ActionsObservable<any>) =>
    action$
      .pipe(
        filter(DockerActions.is.DOCKER_EVENT),
        filter(_ => false)
      )
