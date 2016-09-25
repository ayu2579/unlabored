import { handleActions } from 'redux-actions';

const initialState = {
  data: {},
  status: 'waiting',
  topicData: {},
  topicStatus: 'waiting',
};

export default handleActions({
}, initialState);
