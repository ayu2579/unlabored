import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { createAction as actions } from '../actions';

const initialState = {
  show: false,
  items: {},
};

export default handleActions({
  [actions.SHOW]: (state, action) => _.assign({}, state, action.payload),
  [actions.HIDE]: (state, action) => _.assign({}, state, action.payload),
  [actions.SAVE_ITEM]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
