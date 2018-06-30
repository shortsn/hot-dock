import { combineReducers, Reducer } from 'redux';
import { IDocker, DockerHealth, DockerSystemInfo } from './model';
import { DockerActions } from './actions';
import { ImageInfo, ContainerInfo } from 'dockerode';

const images = (state: ImageInfo[] = [], action) =>
  DockerActions.match(
    {
      DOCKER_FETCH_IMAGES_FAILED: () => [],
      DOCKER_UPDATE_IMAGES: items => items,

      DOCKER_REMOVE_IMAGE_SUCCESS: removed => state.filter(item => item.Id !== removed.Id)
    },
    _ => state
  )(action);

const containers = (state: ContainerInfo[] = [], action) =>
  DockerActions.match(
    {
      DOCKER_FETCH_CONTAINERS_FAILED: () => [],
      DOCKER_UPDATE_CONTAINERS: items => items,

      DOCKER_REMOVE_CONTAINER_SUCCESS: id => state.filter(item => item.Id !== id),
    },
    _ => state
  )(action);

const info = (state: DockerSystemInfo = null, action) =>
  DockerActions.match(
    {
      DOCKER_FETCH_SYSTEM_INFO: () => null,
      DOCKER_FETCH_SYSTEM_INFO_FAILED: () => null,
      DOCKER_UPDATE_SYSTEM_INFO: dockerInfo => dockerInfo,
    },
    _ => state
  )(action);

const dockerHealth = (state: DockerHealth = DockerHealth.UNKNOWN, action) =>
  DockerActions.match(
    {
      DOCKER_SET_HEALTHY: () => DockerHealth.HEALTHY,
      DOCKER_SET_UNHEALTHY: () => DockerHealth.UNHEALTHY,
    },
    _ => state
  )(action);

const docker: Reducer<IDocker> = combineReducers({
  dockerHealth,
  images,
  containers,
  info
});

export default docker;
