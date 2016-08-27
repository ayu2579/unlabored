import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { loginAction as actions } from '../actions';

const initialState = {
  show: false,
};

export default handleActions({
  [actions.SHOW]: (state, action) => _.assign({}, state, action.payload),
  [actions.HIDE]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
