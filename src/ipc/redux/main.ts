import isAction from './isAction';
import ipc from '../main';

/**
 * based on https://github.com/hardchor/electron-redux
 */
export function replayActionMain(store) {
  /**
   * Give renderers a way to sync the current state of the store, but be sure
   * we don't expose any remote objects. In other words, we need our state to
   * be serializable.
   *
   * Refer to https://github.com/electron/electron/blob/master/docs/api/remote.md#remote-objects
   */
  (<any>global).getReduxState = () => JSON.stringify(store.getState());

  ipc.on('redux-action', (event, payload) => {
    store.dispatch(payload);
  });
}

/**
 * based on https://github.com/hardchor/electron-redux
 */
export const forwardToRenderer = () => next => (action) => {
  if (!isAction(action) || (action.meta && action.meta.scope === 'local')) {
    return next(action);
  }

  // change scope to avoid endless-loop
  const rendererAction = {
    ...action,
    meta: {
      ...action.meta,
      scope: 'local',
    },
  };

  ipc.sendToRenderers('redux-action', rendererAction);
  return next(action);
};
