import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { searchAction as actions } from '../actions';

const initialState = {
  fetchTagsData: {},
  fetchTagsStatus: 'waiting',
};

export default handleActions({
  [actions.FETCH_TAGS]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
