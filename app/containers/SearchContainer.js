import React from 'react';
import { GlobalNavbar } from '../components/contrib';
import { SearchBar, TagList } from '../components/search';

const SearchContainer = () => (
  <div id="search" className="react-container">
    <SearchBar />
    <TagList />
    <GlobalNavbar />
  </div>
);

export default SearchContainer;
