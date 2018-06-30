import { IAppState } from '../model';
import { DockerHealth } from './model';

export const sessionSelector = (state: IAppState) => state.session;

export const languageSelector = (state: IAppState) => sessionSelector(state).language;

export const dockerHealthSelector = (state: IAppState) => sessionSelector(state).dockerHealth;
export const isDockerHealthySelector = (state: IAppState) => dockerHealthSelector(state) === DockerHealth.HEALTHY;

