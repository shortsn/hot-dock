import { IAppState } from '../model';

export const routerSelector = (state: IAppState) => state.location.router;
