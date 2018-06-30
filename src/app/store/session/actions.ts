import { unionize, ofType } from 'unionize';
import { Language } from './model';

export const SessionActions = unionize({
  SET_LANGUAGE: ofType<Language>(),

  DOCKER_SET_HEALTHY: ofType(),
  DOCKER_SET_UNHEALTHY: ofType(),

}, 'type', 'payload');
