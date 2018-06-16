import { NgRedux } from '@angular-redux/store';
import { Middleware, GenericStoreEnhancer, Reducer, applyMiddleware } from 'redux';
import { getInitialStateRenderer, forwardToMain, replayActionRenderer } from '../ipc/redux/renderer';
import { composeWithDevTools } from 'remote-redux-devtools';

export const config = {
  production: false,
  environment: 'DEV'
};

export function initializeStore<TState>(
    ngRedux: NgRedux<TState>, reducer: Reducer<TState>, middlewares: Middleware[], enhancers: GenericStoreEnhancer[]
  ): TState {

  const composeEnhancers = composeWithDevTools({ realtime: true, name: 'Renderer', port: 8000 });

  const enhancer = composeEnhancers(
    applyMiddleware(forwardToMain, ...middlewares),
    ...enhancers
  ) as any;

  const initialState = getInitialStateRenderer<TState>();
  ngRedux.configureStore(reducer, initialState, null, enhancer);
  replayActionRenderer(ngRedux);

  return initialState;
}
