import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { createAction as actions } from '../actions';

const initialState = {
  items: {},
};

export default handleActions({
  [actions.SAVE_ITEM]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
