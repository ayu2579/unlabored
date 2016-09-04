import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import me from './contrib/meReducer';

import login from './loginReducer';
import topic from './topicReducer';
import create from './createReducer';
import explore from './exploreReducer';
import profile from './profileReducer';

export default combineReducers({
  me, login, topic, create, explore, profile, routing,
});
