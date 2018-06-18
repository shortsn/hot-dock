import { IAppState } from '../../model';

export const layoutSelector = (state: IAppState) => state.controls.layout;

export const subNavSelector = (state: IAppState) => layoutSelector(state).subNav;
export const hasSubNavSelector = (state: IAppState) => subNavSelector(state).length > 0;

export const sideNavSelector = (state: IAppState) => layoutSelector(state).sideNav;
export const hasSideNavSelector = (state: IAppState) => sideNavSelector(state).length > 0;

export const alertsSelector = (state: IAppState) => layoutSelector(state).alerts;
export const hasAlertsSelector = (state: IAppState) => alertsSelector(state).length > 0;
