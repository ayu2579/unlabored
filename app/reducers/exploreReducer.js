import _ from 'lodash';
import { handleActions } from 'redux-actions';
import { exploreAction as actions } from '../actions';

const initialState = {
  fetchData: {},
  fetchStatus: 'waiting',
};

export default handleActions({
  [actions.FETCH]: (state, action) => _.assign({}, state, action.payload),
  [actions.SELECT]: (state, action) => {
    const { rows } = state.fetchData;
    const { selectStatus, selectData } = action.payload;

    if (!_.isEqual(selectStatus, 'success')) {
      return _.assign({}, state, action.payload);
    }

    const topicId = _.toInteger(selectData.topicId);

    _.forEach(rows, r => _.isEqual(r.id, _.toInteger(topicId)) && (r.selection = selectData));

    return _.assign({}, state, action.payload);
  },
}, initialState);
