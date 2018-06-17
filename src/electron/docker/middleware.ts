import * as Docker from 'dockerode';
import { DockerActions } from '../../app/store/data/docker/actions';
import { Middleware, MiddlewareAPI } from 'redux';

export const createDockerMiddleware: (options?: Docker.DockerOptions) => Middleware = options => {
  const docker = new Docker(options);

  return store => next => (action: any) => {

    if (DockerActions.is.FETCH_DOCKER_IMAGES(action)) {
      catchErrors(action.type, store,
        docker.listImages().then(result => store.dispatch(DockerActions.UPDATE_DOCKER_IMAGES(result)))
      );
    }

    return next(action);
  };
};

const catchErrors: <T, S>(actionType: string, store: MiddlewareAPI<S>, promise: Promise<T>) => Promise<any> =
  (actionType, store, promise) => promise
    .catch(error => store.dispatch({
        type: `${actionType}_FAILED`,
        payload: error,
        error: true
      })
    );
