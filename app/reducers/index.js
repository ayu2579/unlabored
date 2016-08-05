import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import feed from './feedReducer';
import rating from './ratingReducer';
import profile from './profileReducer';
import welcome from './welcomeReducer';

export default combineReducers({
  feed, rating, profile, welcome, routing,
});
