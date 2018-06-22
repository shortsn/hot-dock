import * as Docker from 'dockerode';
import { DockerActions } from '../../app/store/data/docker/actions';
import { Middleware, MiddlewareAPI } from 'redux';
import { IpcAction, ErrorAction } from '../../ipc/redux/isAction';
import { timer } from 'rxjs/observable/timer';
import { Subject } from 'rxjs/Subject';

import { of } from 'rxjs/observable/of';
import { switchMap, flatMap, startWith, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { DockerHealth } from '../../app/store/data/docker/model';

function catchErrors<T, S>(originalAction: IpcAction, store: MiddlewareAPI<S>, promise: Promise<T>): Promise<any> {
  return promise.catch(error => store.dispatch(<ErrorAction>{
      type: `${originalAction.type}_FAILED`,
      payload: error,
      error: true,
      meta: {
        originalAction
      }
    })
  );
}

export const createDockerMiddleware: (options?: Docker.DockerOptions) =>
  Middleware = options => store => {

    const docker = new Docker(options);
    const healthCheck$ = new Subject<any>();

    healthCheck$
      .pipe(
        switchMap<any, DockerHealth>(action => DockerActions.is.DOCKER_START_HEALTHCHECK(action)
          ? timer(0, action.payload)
              .pipe(
                flatMap(_ => docker.ping().then(() => DockerHealth.HEALTHY, () => DockerHealth.UNHEALTHY)),
              )
          : of(DockerHealth.UNKNOWN)
        ),
        distinctUntilChanged(),
        map(DockerActions.DOCKER_SET_HEALTH),
        tap(action => store.dispatch(action)),
      )
      .subscribe();

    return next => (action: any) => {

      if (DockerActions.is.FETCH_DOCKER_IMAGES(action)) {
        catchErrors(action, store,
          docker.
            listImages().then(result => store.dispatch(DockerActions.UPDATE_DOCKER_IMAGES(result)))
        );
        return next(action);
      }

      if (DockerActions.is.FETCH_DOCKER_CONTAINERS(action)) {
        catchErrors(action, store,
          docker.
            listContainers().then(result => store.dispatch(DockerActions.UPDATE_DOCKER_CONTAINERS(result)))
        );
        return next(action);
      }

      if (DockerActions.is.DOCKER_REMOVE_IMAGE(action)) {
        catchErrors(action, store,
          docker
            .getImage(action.payload.Id)
            .remove()
            .then(_ => store.dispatch(DockerActions.DOCKER_REMOVE_IMAGE_SUCCESS(action.payload)))
        );
        return next(action);
      }

      if (DockerActions.is.DOCKER_START_HEALTHCHECK(action) || DockerActions.is.DOCKER_STOP_HEALTHCHECK(action)) {
        healthCheck$.next(action);
        return next(action);
      }

      return next(action);
    };

  };

