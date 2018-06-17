import { LayoutActions } from './actions';
import { ILayout } from './model';

const layout = (state: ILayout = { subNav: [], sideNav: [], error: '' }, action) =>
  LayoutActions.match({

    SET_SUBNAV: subNav => ({ ...state, subNav }),
    SET_SIDENAV: sideNav => ({ ...state, sideNav }),
    SET_NAV: ({ sideNav, subNav }) => ({ ...state, sideNav, subNav }),

    SET_ERROR_MESSAGE: error => ({ ...state, error }),

  }, _ => state)(action);

export default layout;
