import { FORMS_CLEAR_STATE_TYPE } from './actions';
import { Action } from 'redux';

function omit(obj, omitKey) {
  return Object.keys(obj).reduce((result, key) => {
    if (key !== omitKey) {
       result[key] = obj[key];
    }
    return result;
  }, {});
}

const forms = (state = {}, action: Action & { payload: string }) => {
  switch (action.type) {
    case FORMS_CLEAR_STATE_TYPE:
      return omit(state, action.payload);
    default:
      return state;
  }
};

export default forms;
