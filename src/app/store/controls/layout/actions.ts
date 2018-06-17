import { unionize, ofType } from 'unionize';
import { INavItem } from './model';

export const LayoutActions = unionize({

  SET_NAV: ofType<{ subNav: INavItem[], sideNav: INavItem[] }>(),
  SET_SUBNAV: ofType<INavItem[]>(),
  SET_SIDENAV: ofType<INavItem[]>(),

}, 'type', 'payload');
