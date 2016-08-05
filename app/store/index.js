/* global window */

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers';
import { api } from '../middlewares';

const initialState = {};
const middlewares = [thunk, api];
const hasDevTools = typeof window === 'object' &&
  typeof window.devToolsExtension !== 'undefined';

export default createStore(reducers, initialState, compose(
  applyMiddleware(...middlewares),
  hasDevTools ? window.devToolsExtension() : f => f
));
