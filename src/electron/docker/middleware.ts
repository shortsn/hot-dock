import * as Docker from 'dockerode';
import { DockerActions } from '../../app/store/data/docker/actions';
import { Middleware } from 'redux';
import { ErrorAction } from '../../ipc/redux/isAction';
import { timer } from 'rxjs/observable/timer';
import { Subject } from 'rxjs/Subject';

import { of } from 'rxjs/observable/of';
import { switchMap, flatMap, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { DockerHealth } from '../../app/store/data/docker/model';

export const createDockerMiddleware: (options?: Docker.DockerOptions) => Middleware =
  options => store => {

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

      const dispatched = next(action);

      const dockerAction = DockerActions.match<any, Promise<any>>({

        DOCKER_FETCH_IMAGES: () =>
          docker
            .listImages().then(result => store.dispatch(DockerActions.DOCKER_UPDATE_IMAGES(result))),

        DOCKER_FETCH_SYSTEM_INFO: () =>
          docker
            .info().then(result => store.dispatch(DockerActions.DOCKER_UPDATE_SYSTEM_INFO(result))),

        DOCKER_FETCH_CONTAINERS: () =>
          docker
            .listContainers({ all: true }).then(result => store.dispatch(DockerActions.DOCKER_UPDATE_CONTAINERS(result))),

        DOCKER_REMOVE_IMAGE: imageInfo =>
          docker
            .getImage(imageInfo.Id)
            .remove()
            .then(_ => store.dispatch(DockerActions.DOCKER_REMOVE_IMAGE_SUCCESS(imageInfo))),

        DOCKER_START_HEALTHCHECK: () => Promise.resolve(healthCheck$.next(action)),
        DOCKER_STOP_HEALTHCHECK: () => Promise.resolve(healthCheck$.next(action)),

        DOCKER_CREATE_CONTAINER: ({ imageId }) => docker.createContainer({ Image: imageId }),

        DOCKER_START_CONTAINER: containerId =>
          docker
            .getContainer(containerId)
            .start()
            .then(_ => store.dispatch(DockerActions.DOCKER_START_CONTAINER_SUCCESS(containerId))),

        DOCKER_PAUSE_CONTAINER: containerId =>
          docker
            .getContainer(containerId)
            .pause()
            .then(_ => store.dispatch(DockerActions.DOCKER_PAUSE_CONTAINER_SUCCESS(containerId))),

        DOCKER_UNPAUSE_CONTAINER: containerId =>
          docker
            .getContainer(containerId)
            .unpause()
            .then(_ => {
              store.dispatch(DockerActions.DOCKER_UNPAUSE_CONTAINER_SUCCESS(containerId));
            }),

        DOCKER_STOP_CONTAINER: containerId =>
          docker
            .getContainer(containerId)
            .stop()
            .then(_ => store.dispatch(DockerActions.DOCKER_STOP_CONTAINER_SUCCESS(containerId))),

        DOCKER_KILL_CONTAINER: containerId =>
          docker
            .getContainer(containerId)
            .kill()
            .then(_ => store.dispatch(DockerActions.DOCKER_KILL_CONTAINER_SUCCESS(containerId))),

        DOCKER_REMOVE_CONTAINER: containerId =>
          docker
            .getContainer(containerId)
            .remove()
            .then(_ => store.dispatch(DockerActions.DOCKER_REMOVE_CONTAINER_SUCCESS(containerId))),

      }, () => Promise.resolve())(action);

      dockerAction.catch(error =>
        store.dispatch(<ErrorAction>{
          type: `${action.type}_FAILED`,
          payload: error,
          error: true,
          meta: {
            originalAction: action
          }
        })
      );

      return dispatched;
    };

  };

