import { unionize, ofType } from 'unionize';
import { ImageInfo } from 'dockerode';

export const DockerActions = unionize({

  FETCH_DOCKER_IMAGES: ofType(),
  UPDATE_DOCKER_IMAGES: ofType<ImageInfo[]>()

}, 'type', 'payload');
