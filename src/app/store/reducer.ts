import { combineReducers, Reducer } from 'redux';
import session from './session/reducer';
import location from './location/reducer';
import { IAppState } from './model';

const rootReducer: Reducer<IAppState> = combineReducers({
  session,
  location
});

export default rootReducer;
