import { createMemoryHistory, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import store from '../store';

const history = typeof window === 'object' ?
  syncHistoryWithStore(browserHistory, store) :
    syncHistoryWithStore(createMemoryHistory(), store);

export default history;
