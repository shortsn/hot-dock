import {composeReducers, defaultFormReducer} from '@angular-redux/form';
import { combineReducers, Reducer } from 'redux';
import session from './session/reducer';
import location from './location/reducer';
import { IAppState } from './model';
import data from './data/reducer';
import controls from './controls/reducer';

const rootReducer: Reducer<IAppState> = combineReducers({
  controls,
  data,
  location,
  session
});


export default composeReducers(
  defaultFormReducer(),
  rootReducer
);
