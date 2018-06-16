import { IAppState } from '../../model';

export const dockerSelector = (state: IAppState) => state.data.docker;

export const dockerImagesSelector = (state: IAppState) => dockerSelector(state).images;
