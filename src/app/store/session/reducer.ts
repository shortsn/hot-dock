import { ISession, Language } from './model';
import { Action, Reducer, combineReducers } from 'redux';
import { AppConfig } from '../../config';
import { LanguageActions } from './actions';

const config = (state, action: Action) => AppConfig;

const language = (state = '', action) =>
  LanguageActions.match({
    SET_LANGUAGE: lang => lang,
  }, _ => state)(action);

const session: Reducer<ISession> = combineReducers({
  config,
  language
});

export default session;
