import { unionize, ofType } from 'unionize';
import { ImageInfo, ContainerInfo } from 'dockerode';
import { DockerHealth } from './model';

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

  DOCKER_START_HEALTHCHECK: ofType<number>(),
  DOCKER_STOP_HEALTHCHECK: ofType<{}>(),
  DOCKER_SET_HEALTH: ofType<DockerHealth>(),

}, 'type', 'payload');
