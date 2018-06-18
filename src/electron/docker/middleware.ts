import * as Docker from 'dockerode';
import { DockerActions } from '../../app/store/data/docker/actions';
import { Middleware, MiddlewareAPI } from 'redux';
import { IpcAction, ErrorAction } from '../../ipc/redux/isAction';

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

export const createDockerMiddleware: (options?: Docker.DockerOptions) => Middleware = options => {
  const docker = new Docker(options);

  return store => next => (action: any) => {

    if (DockerActions.is.FETCH_DOCKER_IMAGES(action)) {
      catchErrors(action, store,
        docker.listImages().then(result => store.dispatch(DockerActions.UPDATE_DOCKER_IMAGES(result)))
      );
    }

    return next(action);
  };
};
