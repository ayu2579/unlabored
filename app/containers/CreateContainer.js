import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { createAction as actions } from '../actions';
import { AutoResizeInput } from '../components/contrib';
import { ItemCreator } from '../components/create';

class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const text = this.text.getValue();
    this.props.dispatch(actions.saveTopic({ text }));
  }

  render() {
    return (
      <div id="create" className="react-container">
        <div className="items">
          <ItemCreator direction="left" />
          <ItemCreator direction="right" />
        </div>
        <AutoResizeInput
          ref={c => (this.text = c)}
          type="textarea"
          placeholder="내용적어"
        />

        <Button
          className="btn-submit"
          onClick={this.handleSubmit}
        >
          뭐가 좋은지 물어봐
        </Button>
      </div>
    );
  }
}

CreateContainer.propTypes = {
  create: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(state => ({ create: state.create }))(CreateContainer);
