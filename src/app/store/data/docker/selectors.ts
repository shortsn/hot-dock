import { IAppState } from '../../model';
import { DockerImage, DockerHealth, DockerContainer } from './model';

export const dockerSelector = (state: IAppState) => state.data.docker;

export const dockerImageInfosSelector = (state: IAppState) => dockerSelector(state).images;
export const dockerImagesSelector = (state: IAppState) =>
  dockerImageInfosSelector(state).map(info => new DockerImage(info));

export const dockerContainerInfosSelector = (state: IAppState) => dockerSelector(state).containers;
export const dockerContainerSelector = (state: IAppState) =>
  dockerContainerInfosSelector(state).map(info => new DockerContainer(info));

export const dockerHealthSelector = (state: IAppState) => dockerSelector(state).dockerHealth;
export const isDockerHealthySelector = (state: IAppState) => dockerHealthSelector(state) === DockerHealth.HEALTHY;
