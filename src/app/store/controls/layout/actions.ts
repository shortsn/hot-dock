import { unionize, ofType } from 'unionize';
import { INavItem, IAlert } from './model';
import { Action } from 'redux';

export const LayoutActions = unionize({

  SET_NAV: ofType<{ subNav: INavItem[], sideNav: INavItem[] }>(),
  SET_SUBNAV: ofType<INavItem[]>(),
  SET_SIDENAV: ofType<INavItem[]>(),

  ADD_ALERT: ofType<IAlert>(),
  REMOVE_ALERT: ofType<string>(),

  DISPATCH_ON_REFRESH: ofType<Action[]>()

}, 'type', 'payload');
