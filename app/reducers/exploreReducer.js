import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { exploreAction as actions } from '../actions';

const initialState = {
  fetchData: {},
  fetchStatus: 'waiting',
};

export default handleActions({
  [actions.FETCH]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
