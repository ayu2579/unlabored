import _ from 'lodash';

import React, { Component, PropTypes } from 'react';
import { HelpBlock, FormControl } from 'react-bootstrap';

class CountableInput extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '', count: 0 };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  getValue() {
    return this.state.value;
  }

  handleKeyDown(e) {
    const { max } = this.props;
    const count = _.size(e.target.value) + 1;
    const isMax = !_.isEqual(e.keyCode, 8) && count > max;

    if (!isMax) { return; }

    e.preventDefault();
  }

  handleChange(e) {
    this.setState({
      value: e.target.value,
      count: _.size(e.target.value),
    });
    this.props.onChange(e);
  }

  render() {
    const { max } = this.props;
    const { count } = this.state || {};

    return (
      <div className="countable-input">
        <HelpBlock>{count} / {max}</HelpBlock>
        <FormControl
          {...this.props}
          type="text"
          onChange={this.handleChange}
          onKeyPress={this.handleKeyDown}
        />
      </div>
    );
  }
}

CountableInput.defaultProps = {
  max: 30,
  onChange: () => {},
};

CountableInput.propTypes = {
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CountableInput;
