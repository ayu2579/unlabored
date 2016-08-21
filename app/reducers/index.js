import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import create from './createReducer';
import profile from './profileReducer';
import welcome from './welcomeReducer';

export default combineReducers({
  create, profile, welcome, routing,
});
