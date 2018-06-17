import { LayoutActions } from './actions';
import { ILayout } from './model';

const layout = (state: ILayout = { subNav: [], sideNav: [] }, action) =>
  LayoutActions.match({

    SET_SUBNAV: subNav => ({ ...state, subNav }),
    SET_SIDENAV: sideNav => ({ ...state, sideNav }),
    SET_NAV: ({ sideNav, subNav }) => ({ ...state, sideNav, subNav })

  }, _ => state)(action);

export default layout;
