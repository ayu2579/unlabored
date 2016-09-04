import _ from 'lodash';
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import store from '../../store';
import { createAction } from '../../actions';

class ColorPicker extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
    const { candidateColors } = this.props;

    this.handleSelect(_.first(candidateColors));
  }

  handleSelect(selectedColor) {
    store.dispatch(createAction.setColor(selectedColor));
  }

  render() {
    const { candidateColors } = this.props;
    const { selectedColor } = store.getState().create;

    return (
      <div id="color-picker">
        <ul>
          {
            _.map(candidateColors, color =>
              <li
                key={color}
                className={
                  classNames({
                    active: _.isEqual(selectedColor, color),
                  })
                }
              >
                <Button
                  style={{ backgroundColor: color }}
                  onClick={() => this.handleSelect(color)}
                />
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

ColorPicker.defaultProps = {
  candidateColors: [
    '#e15845', '#d64668', '#8f46ad',
    '#5f4cb2', '#405ab0', '#459aed',
    '#f6c03f', '#f29c38', '#667d8a',
  ],
  onSelect: () => {},
};

ColorPicker.propTypes = {
  candidateColors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ColorPicker;
