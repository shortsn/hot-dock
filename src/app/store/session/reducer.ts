import { ISession, DockerHealth, Language } from './model';
import { Action, Reducer, combineReducers } from 'redux';
import { SessionActions } from './actions';

const config = (state = null, action: Action) => state;

const language = (state = Language.en, action) =>
SessionActions.match(
  {
      SET_LANGUAGE: lang => lang,
  },
    _ => state
  )(action);

  const dockerHealth = (state: DockerHealth = DockerHealth.UNKNOWN, action) =>
  SessionActions.match(
    {
      DOCKER_SET_HEALTHY: () => DockerHealth.HEALTHY,
      DOCKER_SET_UNHEALTHY: () => DockerHealth.UNHEALTHY,
    },
    _ => state
  )(action);

const session: Reducer<ISession> = combineReducers({
  config,
  language,
  dockerHealth
});

export default session;
