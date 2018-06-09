import { ISession } from './model';
import { Action } from 'redux';

export default function session(state: ISession = { config: null }, action: Action) {
  return state;
}
