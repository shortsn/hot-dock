import { combineReducers, Reducer } from 'redux';
import { IDocker, DockerSystemInfo, DockerEvent } from './model';
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
      DOCKER_FETCH_SYSTEM_INFO_FAILED: () => null,
      DOCKER_UPDATE_SYSTEM_INFO: dockerInfo => dockerInfo,
    },
    _ => state
  )(action);

const recentEvents = (state: DockerEvent[] = [], action) =>
  DockerActions.match(
    {
      DOCKER_EVENT: event => [event, ...state.slice(0, Math.min(state.length, 19))],
    },
    _ => state
  )(action);

const docker: Reducer<IDocker> = combineReducers({
  images,
  containers,
  info,
  recentEvents
});

export default docker;
