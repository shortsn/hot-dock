import { app } from 'electron';

import * as Docker from 'dockerode';
import { DockerActions } from '../../app/store/data/docker/actions';
import { Middleware } from 'redux';
import { ErrorAction } from '../../ipc/redux/isAction';

import { fromEvent } from 'rxjs/observable/fromEvent';
import { tap, map, last, first, takeUntil, publish, refCount, distinctUntilChanged } from 'rxjs/operators';
import { DockerHealth } from '../../app/store/session/model';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { SessionActions } from '../../app/store/session/actions';

const willQuit$ = fromEvent(app, 'will-quit').pipe(
  first(),
  publish(),
  refCount()
);

const streamToObservable = (stream: NodeJS.ReadableStream): Observable<Buffer> =>
  new Observable<Buffer>(subscriber => {
    const endHandler = () => subscriber.complete();
    const errorHandler = (e: Error) => subscriber.error(e);
    const dataHandler = (data: Buffer) => subscriber.next(data);

    stream.addListener('close', endHandler);
    stream.addListener('end', endHandler);
    stream.addListener('error', errorHandler);
    stream.addListener('data', dataHandler);

    return () => {
      stream.removeListener('close', endHandler);
      stream.removeListener('end', endHandler);
      stream.removeListener('error', errorHandler);
      stream.removeListener('data', dataHandler);
    };
  });

const monitorDockerEvents = async (store: { dispatch: (action) => any; }, docker: Docker) => {

  let terminate = false;

  willQuit$.pipe(
    tap(_ => terminate = true),
    takeUntil(willQuit$)
  )
  .subscribe();

  const dockerHealth$ = new Subject<DockerHealth>();

  dockerHealth$.pipe(
    distinctUntilChanged(),
    map(health => health === DockerHealth.HEALTHY ? SessionActions.DOCKER_SET_HEALTHY({}) : SessionActions.DOCKER_SET_UNHEALTHY({})),
    tap(action => store.dispatch(action)),
    takeUntil(willQuit$)
  )
  .subscribe();

  while (!terminate) {

    try {

      await docker.getEvents()
        .then(async stream => {
          dockerHealth$.next(DockerHealth.HEALTHY);
          await streamToObservable(stream)
            .pipe(
              map(buffer => DockerActions.DOCKER_EVENT(JSON.parse(buffer.toString('UTF-8')))),
              tap(action => store.dispatch(action)),
              last(),
              takeUntil(willQuit$)
            ).toPromise().catch(_ => dockerHealth$.next(DockerHealth.UNHEALTHY));
        })
        .catch(_ => dockerHealth$.next(DockerHealth.UNHEALTHY));

    } finally {
      dockerHealth$.next(DockerHealth.UNHEALTHY);
    }
    await new Promise(resolve => setTimeout(resolve, 5000));
  }

};

export const createDockerMiddleware: (options?: Docker.DockerOptions) => Middleware =
  options => store => {

    const docker = new Docker(options);

    monitorDockerEvents(store, docker);

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

        DOCKER_CREATE_CONTAINER: createOptions => docker.createContainer(createOptions),

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

