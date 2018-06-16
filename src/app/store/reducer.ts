import { combineReducers, Reducer } from 'redux';
import session from './session/reducer';
import location from './location/reducer';
import { IAppState } from './model';
import data from './data/reducer';

const rootReducer: Reducer<IAppState> = combineReducers({
  data,
  location,
  session
});

export default rootReducer;
