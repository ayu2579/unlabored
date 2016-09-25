import React, { Component, PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearch() {
  }

  handleCancel() {
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <div id="search-bar">
        <FormControl
          type="text"
          onChange={this.handleChange}
          placeholder="찾아봐"
        />
      </div>
    );
  }
}

SearchBar.defaultProps = {
  onSearch: () => {},
  onCancel: () => {},
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default SearchBar;
