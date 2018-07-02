import { combineReducers, Reducer } from 'redux';
import { IControls } from './model';
import layout from './layout/reducer';
import forms from './forms/reducer';

const controls: Reducer<IControls> = combineReducers({
  layout,
  forms
});

export default controls;
