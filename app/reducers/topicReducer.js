import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { topicAction as actions } from '../actions';

const initialState = {
  show: false,
  data: {},
  status: 'waiting',
  fetchCommentsStatus: 'waiting',
  fetchCommentsData: {},
};

export default handleActions({
  [actions.INIT]: (state, action) => _.assign({}, state, action.payload),
  [actions.SHOW]: (state, action) => _.assign({}, state, action.payload),
  [actions.HIDE]: (state, action) => _.assign({}, state, action.payload),
  [actions.FETCH_COMMENTS]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
