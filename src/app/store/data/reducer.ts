import { Action, combineReducers, Reducer } from 'redux';
import { IData } from './model';
import docker from './docker/reducer';

const data: Reducer<IData> = combineReducers({
  docker
});

export default data;
