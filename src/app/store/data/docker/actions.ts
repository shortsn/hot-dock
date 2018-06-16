import { unionize, ofType } from 'unionize';
import { ImageInfo } from 'dockerode';

export const DockerActions = unionize({

  FETCH_DOCKER_IMAGES: ofType(),
  SET_DOCKER_IMAGES: ofType<ImageInfo[]>()

}, 'type', 'payload');
