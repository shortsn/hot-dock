import { combineReducers, Reducer } from 'redux';
import { IDocker, DockerHealth } from './model';
import { DockerActions } from './actions';
import { ImageInfo } from 'dockerode';

const images = (state: ImageInfo[] = [], action) =>
  DockerActions.match(
    {
      DOCKER_FETCH_IMAGES: _ => [],
      DOCKER_FETCH_IMAGES_FAILED: _ => [],
      DOCKER_UPDATE_IMAGES: items => items,

      DOCKER_REMOVE_IMAGE_SUCCESS: removed => state.filter(item => item.Id !== removed.Id)
    },
    _ => state
  )(action);

const containers = (state: ImageInfo[] = [], action) =>
  DockerActions.match(
    {
      DOCKER_FETCH_CONTAINERS: _ => [],
      DOCKER_FETCH_CONTAINERS_FAILED: _ => [],
      DOCKER_UPDATE_CONTAINERS: items => items,

      DOCKER_REMOVE_CONTAINER_SUCCESS: removed => state.filter(item => item.Id !== removed.Id)
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
