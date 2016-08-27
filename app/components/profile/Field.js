import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import store from '../../store';

class Field extends Component {
  constructor(props) {
    super(props);

    const { name, parser } = props;
    const { data } = store.getState().me;

    this.state = {};
    this.state.value = parser.up(data[name]);

    this.handleBlur = this.handleBlur.bind(this);
  }

  save() {
    const { validator } = this.props;
    const help = validator(this.state.value);
    const validationState = _.isEmpty(help) ? 'success' : 'error';

    this.setState({ help, validationState });
  }

  handleBlur() {
    this.save();
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { type, label, parser } = this.props;
    const { value, help, validationState } = this.state || {};

    return (
      <FormGroup validationState={validationState}>
        {!_.isEmpty(label) && <ControlLabel>{label}</ControlLabel>}

        <FormControl
          type={type}
          value={parser.down(value)}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />

        <HelpBlock>{help}</HelpBlock>
      </FormGroup>
    );
  }
}

Field.defaultProps = {
  type: 'text',
  validator: () => {},
  parser: {
    up: __ => __,
    down: __ => __,
  },
};

Field.propTypes = {
  type: PropTypes.oneOf(['text', 'textarea']).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  validator: PropTypes.func.isRequired,
  parser: PropTypes.shape({
    up: PropTypes.func.isRequired,
    down: PropTypes.func.isRequired,
  }).isRequired,
};

export default Field;
