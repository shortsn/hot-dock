import { IAppState } from '../../model';
import { DockerImage, DockerContainer } from './model';

export const dockerSelector = (state: IAppState) => state.data.docker;

export const dockerImageInfosSelector = (state: IAppState) => dockerSelector(state).images;
export const dockerImagesSelector = (state: IAppState) =>
  dockerImageInfosSelector(state).map(info => new DockerImage(info));

export const dockerRecentEventsSelector = (state: IAppState) => dockerSelector(state).recentEvents;

export const dockerContainerInfosSelector = (state: IAppState) => dockerSelector(state).containers;
export const dockerContainerSelector = (state: IAppState) =>
  dockerContainerInfosSelector(state).map(info => new DockerContainer(info));

export const dockerInfoSelector = (state: IAppState) => dockerSelector(state).info;

