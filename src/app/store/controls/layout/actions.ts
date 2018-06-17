import { unionize, ofType } from 'unionize';
import { INavItem } from './model';

export const LayoutActions = unionize({

  SET_SUBNAV: ofType<INavItem[]>(),

}, 'type', 'payload');
