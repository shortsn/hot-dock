import { Action } from 'redux';

export interface IpcAction extends Action {
  payload?: any;
  error?: true;
  meta?: any;
}

const isValidKey = (key) => ['type', 'payload', 'error', 'meta'].indexOf(key) > -1;

export default function isAction(arg: any): arg is IpcAction {
  return typeof (arg) === 'object' && typeof (arg.type) === 'string' && Object.keys(arg).every(isValidKey);
}
