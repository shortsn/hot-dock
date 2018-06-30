import { Injectable } from '@angular/core';
import { ActionsObservable } from 'redux-observable';

import { filter, switchMap, startWith, map, auditTime } from 'rxjs/operators';
import { DockerActions } from '../../data/docker/actions';
import { isUpdateLocationAction } from '../../location/model';
import { empty } from 'rxjs/observable/empty';

@Injectable()
export class DashboardComponentEpics {

  loadInfo = (action$: ActionsObservable<any>) =>
    action$.pipe(
      filter(action => isUpdateLocationAction(action)),
      switchMap(
        action =>
          action.payload.startsWith('/info/dashboard')
            ? action$.pipe(
                filter(a => DockerActions.is.DOCKER_EVENT(a) || DockerActions.is.DOCKER_SET_HEALTHY(a)),
                map(_ => DockerActions.DOCKER_FETCH_SYSTEM_INFO({})),
                auditTime(100),
                startWith(DockerActions.DOCKER_FETCH_SYSTEM_INFO({}))
              )
            : empty()
      )
    )

}
