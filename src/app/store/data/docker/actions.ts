import { unionize, ofType } from 'unionize';
import { ImageInfo } from 'dockerode';

export const DockerActions = unionize({

  FETCH_DOCKER_IMAGES: ofType(),
  FETCH_DOCKER_IMAGES_FAILED: ofType<Error>(),

  DOCKER_REMOVE_IMAGE: ofType<ImageInfo>(),
  DOCKER_REMOVE_IMAGE_SUCCESS: ofType<ImageInfo>(),
  DOCKER_REMOVE_IMAGE_FAILED: ofType<Error>(),

  UPDATE_DOCKER_IMAGES: ofType<ImageInfo[]>(),

}, 'type', 'payload');
