import { unionize, ofType } from 'unionize';
import { INavItem } from './model';

export const LayoutActions = unionize({

  SET_SUBNAV: ofType<INavItem[]>(),
  SET_SIDENAV: ofType<INavItem[]>(),

}, 'type', 'payload');
