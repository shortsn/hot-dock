import { LayoutActions } from './actions';
import { ILayout } from './model';

const layout = (state: ILayout = { subNav: [] }, action) =>
  LayoutActions.match({

    SET_SUBNAV: subNav => ({ ...state, subNav })

  }, _ => state)(action);

export default layout;
