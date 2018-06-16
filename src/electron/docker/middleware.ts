import * as Docker from 'dockerode';
import { DockerActions } from '../../app/store/data/docker/actions';

export const createDockerMiddleware = (options?: Docker.DockerOptions) => {
  const docker = new Docker(options);

  return store => next => action => {

    if (DockerActions.is.FETCH_DOCKER_IMAGES(action)) {
      docker.listImages().then(result => store.dispatch(DockerActions.UPDATE_DOCKER_IMAGES(result)));
    }

    return next(action);
  };
};
