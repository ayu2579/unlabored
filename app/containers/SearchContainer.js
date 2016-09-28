import _ from 'lodash';
import { connect } from 'react-redux';

import React from 'react';
import { GlobalNavbar } from '../components/contrib';
import { SearchBar, SuggestedList } from '../components/search';

const SearchContainer = () => (
  <div id="search" className="react-container">
    <SearchBar />
    <SuggestedList />
    <GlobalNavbar />
  </div>
);

export default connect(state => _.pick(state, ['search']))(SearchContainer);
