import { combineReducers, Reducer } from 'redux';
import { IDocker, DockerHealth } from './model';
import { DockerActions } from './actions';
import { ImageInfo } from 'dockerode';

const images = (state: ImageInfo[] = [], action) =>
  DockerActions.match(
    {
      FETCH_DOCKER_IMAGES: _ => [],
      FETCH_DOCKER_IMAGES_FAILED: _ => [],
      UPDATE_DOCKER_IMAGES: items => items,

      DOCKER_REMOVE_IMAGE_SUCCESS: removed =>
        state.filter(item => item.Id !== removed.Id)
    },
    _ => state
  )(action);

const containers = (state: ImageInfo[] = [], action) =>
  DockerActions.match(
    {
      FETCH_DOCKER_CONTAINERS: _ => [],
      FETCH_DOCKER_CONTAINERS_FAILED: _ => [],
      UPDATE_DOCKER_CONTAINERS: items => items,
    },
    _ => state
  )(action);

const dockerHealth = (state: DockerHealth = DockerHealth.UNKNOWN, action) =>
  DockerActions.match(
    {
      DOCKER_SET_HEALTH: health => health,
      DOCKER_STOP_HEALTHCHECK: _ => DockerHealth.UNKNOWN
    },
    _ => state
  )(action);

const docker: Reducer<IDocker> = combineReducers({
  dockerHealth,
  images,
  containers
});

export default docker;
