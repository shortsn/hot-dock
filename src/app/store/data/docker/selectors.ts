import { IAppState } from '../../model';
import { DockerImage } from './model';

export const dockerSelector = (state: IAppState) => state.data.docker;

export const dockerImageInfosSelector = (state: IAppState) => dockerSelector(state).images;

export const dockerImagesSelector = (state: IAppState) =>
  dockerImageInfosSelector(state)
    .map(image => new DockerImage(image));
