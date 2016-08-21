import $ from 'jquery';
import _ from 'lodash';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';

import React, { Component, PropTypes } from 'react';
import { FormControl } from 'react-bootstrap';

class AutoResizeInput extends Component {
  constructor(props) {
    super(props);

    this.autoGrow = this.autoGrow.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.autoGrow();
  }

  getValue() {
    return _.get(this.state, 'value', '');
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
    this.autoGrow();
    this.props.onChange(e);
  }

  autoGrow() {
    setTimeout(() => {
      const { type } = this.props;
      const { value } = this.state || {};
      const input = $(findDOMNode(this.input));
      const preferredStyle = {
        padding: input.css('padding'),
        fontSize: input.css('fontSize'),
        lineHeight: input.css('lineHeight'),
        fontWeight: input.css('fontWeight'),
      };

      this.setState({ preferredStyle });

      // when using text adjust width only.
      if (_.isEqual(type, 'text')) {
        const clone = $(findDOMNode(this.clone));
        clone.val(value);
        const preferredWidth = clone.prop('scrollWidth');
        this.setState({ preferredWidth });

        return;
      }

      // when using textarea adjust height only.
      if (_.isEqual(type, 'textarea')) {
        const clone = $(findDOMNode(this.clone));
        clone.val(value);
        clone.width(input.width());
        const preferredHeight = clone.prop('scrollHeight');

        this.setState({ preferredHeight });
        return;
      }
    }, 1);
  }

  render() {
    const { children, type } = this.props;
    const { value, preferredWidth, preferredHeight, preferredStyle } = this.state || {};

    return (
      <div
        className={
          classNames({
            [type]: true,
            'auto-resize-input': true,
          })
        }
      >
        <FormControl
          {...this.props}
          componentClass={type}
          ref={c => (this.input = c)}
          style={{ width: preferredWidth, height: preferredHeight }}
          value={value}
          onChange={this.handleChange}
        >
          {children}
        </FormControl>
        {
          _.isEqual(type, 'text') &&
            <input
              ref={c => (this.clone = c)}
              className="input-clone"
              style={preferredStyle}
              readOnly
            />
        }
        {
          _.isEqual(type, 'textarea') &&
            <textarea
              ref={c => (this.clone = c)}
              className="textarea-clone"
              style={preferredStyle}
              readOnly
            />
        }
      </div>
    );
  }
}

AutoResizeInput.defaultProps = {
  type: 'text',
  onChange: () => {},
};

AutoResizeInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default AutoResizeInput;
