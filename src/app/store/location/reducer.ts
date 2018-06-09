import { Action, combineReducers, Reducer } from 'redux';
import { ILocation } from './model';
import { routerReducer } from '@angular-redux/router';

const location: Reducer<ILocation> = combineReducers({
  router: routerReducer
});

export default location;
