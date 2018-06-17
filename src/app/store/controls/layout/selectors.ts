import { IAppState } from '../../model';

export const layoutSelector = (state: IAppState) => state.controls.layout;

export const subNavSelector = (state: IAppState) => layoutSelector(state).subNav;
