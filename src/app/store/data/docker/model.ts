import { ImageInfo } from 'dockerode';

export interface IDocker {
  images: ImageInfo[];
}
