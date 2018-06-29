import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';

import { filter, switchMap, startWith, map, auditTime } from 'rxjs/operators';
import { DockerActions } from '../../data/docker/actions';
import { isUpdateLocationAction } from '../../location/model';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class DockerImagesComponentEpics {

  loadImages = (action$: ActionsObservable<any>) =>
    action$.pipe(
      filter(action => isUpdateLocationAction(action)),
      switchMap(
        action =>
          action.payload.startsWith('/info/images')
            ? action$.pipe(
                filter(DockerActions.is.DOCKER_EVENT),
                map(_ => DockerActions.DOCKER_FETCH_IMAGES({})),
                auditTime(100),
                startWith(DockerActions.DOCKER_FETCH_IMAGES({}))
              )
            : empty()
      )
    )

}
