import { unionize, ofType } from 'unionize';
import { ImageInfo, ContainerInfo } from 'dockerode';
import { DockerHealth, DockerSystemInfo } from './model';

export const DockerActions = unionize({

  DOCKER_FETCH_IMAGES: ofType(),
  DOCKER_FETCH_IMAGES_FAILED: ofType<Error>(),
  DOCKER_UPDATE_IMAGES: ofType<ImageInfo[]>(),

  DOCKER_REMOVE_IMAGE: ofType<ImageInfo>(),
  DOCKER_REMOVE_IMAGE_SUCCESS: ofType<ImageInfo>(),
  DOCKER_REMOVE_IMAGE_FAILED: ofType<Error>(),

  DOCKER_FETCH_CONTAINERS: ofType(),
  DOCKER_FETCH_CONTAINERS_FAILED: ofType<Error>(),
  DOCKER_UPDATE_CONTAINERS: ofType<ContainerInfo[]>(),

  DOCKER_START_CONTAINER: ofType<string>(),
  DOCKER_START_CONTAINER_SUCCESS: ofType<string>(),
  DOCKER_START_CONTAINER_FAILED: ofType<Error>(),

  DOCKER_PAUSE_CONTAINER: ofType<string>(),
  DOCKER_PAUSE_CONTAINER_SUCCESS: ofType<string>(),
  DOCKER_PAUSE_CONTAINER_FAILED: ofType<Error>(),

  DOCKER_UNPAUSE_CONTAINER: ofType<string>(),
  DOCKER_UNPAUSE_CONTAINER_SUCCESS: ofType<string>(),
  DOCKER_UNPAUSE_CONTAINER_FAILED: ofType<Error>(),

  DOCKER_STOP_CONTAINER: ofType<string>(),
  DOCKER_STOP_CONTAINER_SUCCESS: ofType<string>(),
  DOCKER_STOP_CONTAINER_FAILED: ofType<Error>(),

  DOCKER_KILL_CONTAINER: ofType<string>(),
  DOCKER_KILL_CONTAINER_SUCCESS: ofType<string>(),
  DOCKER_KILL_CONTAINER_FAILED: ofType<Error>(),

  DOCKER_REMOVE_CONTAINER: ofType<string>(),
  DOCKER_REMOVE_CONTAINER_SUCCESS: ofType<string>(),
  DOCKER_REMOVE_CONTAINER_FAILED: ofType<Error>(),

  DOCKER_FETCH_SYSTEM_INFO: ofType(),
  DOCKER_FETCH_SYSTEM_INFO_FAILED: ofType<Error>(),
  DOCKER_UPDATE_SYSTEM_INFO: ofType<DockerSystemInfo>(),

  DOCKER_CREATE_CONTAINER: ofType<{ imageId: string }>(),

  DOCKER_SET_HEALTHY: ofType(),
  DOCKER_SET_UNHEALTHY: ofType(),
  DOCKER_EVENT: ofType<any>(),

}, 'type', 'payload');
