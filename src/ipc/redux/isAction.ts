import { Action } from 'redux';

export interface IpcAction extends Action {
  payload?: any;
  error?: true;
  meta?: any;
}

export interface ErrorAction extends Action {
  payload: any;
  error: true;
}

const isValidKey = (key) => ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;

export function isAction(arg: any): arg is IpcAction {
  return typeof (arg) === 'object' && typeof (arg.type) === 'string' && Object.keys(arg).every(isValidKey);
}

export function isErrorAction(arg: any): arg is ErrorAction {
  return typeof (arg) === 'object' && typeof (arg.type) === 'string' && arg.error === true && arg.payload !== undefined;
}
