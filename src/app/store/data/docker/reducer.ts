import { combineReducers, Reducer } from 'redux';
import { IDocker } from './model';
import { DockerActions } from './actions';
import { ImageInfo } from 'dockerode';

const images = (state: ImageInfo[] = [], action) =>
  DockerActions.match({

    FETCH_DOCKER_IMAGES: _ => [],
    UPDATE_DOCKER_IMAGES: items => items,

    DOCKER_REMOVE_IMAGE_SUCCESS: removed => state.filter(item => item.Id !== removed.Id)

  }, _ => state)(action);

const docker: Reducer<IDocker> = combineReducers({
  images
});

export default docker;
