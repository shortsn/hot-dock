import isAction from './isAction';
import ipc from '../renderer';

/**
 * based on https://github.com/hardchor/electron-redux
 */
export function getInitialStateRenderer<TState>(): TState {
  const getReduxState = window.getGlobal('getReduxState');
  if (!getReduxState) {
    throw new Error('Could not find reduxState global in main process, did you forget to call replayActionMain?');
  }
  return JSON.parse(getReduxState());
}

/**
 * based on https://github.com/hardchor/electron-redux
 */
export const replayActionRenderer = (store) =>
  ipc.on('redux-action', (event, payload) => store.dispatch(payload));

/**
 * based on https://github.com/hardchor/electron-redux
 */
export const forwardToMain = store => next => (action) => {
  if (!isAction(action)) { return next(action); }

  if (
    action.type.substr(0, 2) !== '@@'
    && action.type.substr(0, 10) !== 'redux-form'
    && (
      !action.meta
      || !action.meta.scope
      || action.meta.scope !== 'local'
    )
  ) {
    ipc.send('redux-action', action);
    // stop action in-flight
    return;
  }

  return next(action);
};
