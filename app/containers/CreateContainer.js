import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import store from '../store';
import { createAction } from '../actions';
import { AutoResizeInput, NavigationBar } from '../components/contrib';
import { ItemCreator } from '../components/create';

class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.handleExit = this.handleExit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleExit() {
    store.dispatch(createAction.hide());
  }

  handleSubmit() {
    const text = this.text.getValue();
    store.dispatch(createAction.saveTopic({ text }));
  }

  render() {
    return (
      <div id="create" className="react-container">
        <NavigationBar
          title="사진 두장만 골라봐"
          onExit={this.handleExit}
        />
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

export default connect(state => _.pick(state, ['create']))(CreateContainer);
