import { combineReducers, Reducer } from 'redux';
import { IControls } from './model';
import layout from './layout/reducer';

const controls: Reducer<IControls> = combineReducers({
  layout
});

export default controls;
