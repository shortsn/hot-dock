import { Action, combineReducers, Reducer } from 'redux';
import { IDocker } from './model';
import { DockerActions } from './actions';

const images = (state = [], action) =>
  DockerActions.match({

    FETCH_DOCKER_IMAGES: _ => [],
    UPDATE_DOCKER_IMAGES: items => items,

  }, _ => state)(action);

const docker: Reducer<IDocker> = combineReducers({
  images
});

export default docker;
