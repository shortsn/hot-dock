import { ISession } from './model';
import { Action, Reducer, combineReducers } from 'redux';
import { LanguageActions } from './actions';

const config = (state = null, action: Action) => state;

const language = (state = 'en', action) =>
  LanguageActions.match({
    SET_LANGUAGE: lang => lang,
  }, _ => state)(action);

const session: Reducer<ISession> = combineReducers({
  config,
  language
});

export default session;
