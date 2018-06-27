import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';

import { timer } from 'rxjs/observable/timer';
import { filter, startWith, map, flatMap, scan, switchMap, tap, throttleTime } from 'rxjs/operators';
import { isUpdateLocationAction, RouterUpdateLocationAction } from '../../location/model';
import { empty } from 'rxjs/observable/empty';
import { DockerActions } from '../../data/docker/actions';
import { merge } from 'rxjs/observable/merge';

@Injectable()
export class DockerContainersEpics {

  loadContainers = (action$: ActionsObservable<any>) =>
    action$
      .pipe(
        filter(action => isUpdateLocationAction(action)),
        switchMap<RouterUpdateLocationAction, any>(action => action.payload.startsWith('/info/containers')
          ? merge(
              timer(0, 60000).pipe(map(_ => DockerActions.DOCKER_FETCH_CONTAINERS({}))),
            action$
              .pipe(
                filter(a =>
                  DockerActions.is.DOCKER_START_CONTAINER_SUCCESS(a) ||
                  DockerActions.is.DOCKER_STOP_CONTAINER_SUCCESS(a) ||
                  DockerActions.is.DOCKER_PAUSE_CONTAINER_SUCCESS(a) ||
                  DockerActions.is.DOCKER_UNPAUSE_CONTAINER_SUCCESS(a) ||
                  DockerActions.is.DOCKER_KILL_CONTAINER_SUCCESS(a)
                ),
                map(_ => DockerActions.DOCKER_FETCH_CONTAINERS({}))
              ),
            )
          : empty()
        )
      )

}
