import { NgRedux } from '@angular-redux/store';
import { Reducer, Middleware, GenericStoreEnhancer } from 'redux';
import { forwardToMain, getInitialStateRenderer, replayActionRenderer } from '../ipc/redux/renderer';

export const config = {
  production: true,
  environment: 'PROD'
};

export function initializeStore<TState>(
  ngRedux: NgRedux<TState>, reducer: Reducer<TState>, middlewares: Middleware[], enhancers: GenericStoreEnhancer[]
): TState {

  const initialState = getInitialStateRenderer<TState>();
  ngRedux.configureStore(reducer, initialState, [forwardToMain, ...middlewares], enhancers);
  replayActionRenderer(ngRedux);

  return initialState;
}
