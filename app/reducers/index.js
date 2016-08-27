import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import me from './contrib/meReducer';

import login from './loginReducer';
import create from './createReducer';
import profile from './profileReducer';

export default combineReducers({
  me, login, create, profile, routing,
});
