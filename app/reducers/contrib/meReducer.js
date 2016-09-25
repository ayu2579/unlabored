import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { meAction as actions } from '../../actions';

const initialState = {
  data: {
    counts: {},
  },
  status: 'waiting',
};

export default handleActions({
  [actions.GET]: (state, action) => _.assign({}, state, action.payload),
}, initialState);
