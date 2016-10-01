import _ from 'lodash';

import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import store from '../../store';
import { topicAction } from '../../actions';
import { AutoResizeInput } from '../contrib';

class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({ value: this.input.getValue() });
  }

  handleSubmit() {
    const text = this.input.getValue();

    store.dispatch(topicAction.postComment(text))
    .then(() => store.dispatch(topicAction.fetchComments()));
  }

  render() {
    const { value } = this.state || {};
    const { status } = store.getState().topic;

    return (
      <div id="comment-input">
        <AutoResizeInput
          ref={c => (this.input = c)}
          type="textarea"
          value={value}
          onChange={this.handleChange}
        />
        <Button
          disabled={_.isEmpty(value) || !_.isEqual(status, 'success')}
          onClick={this.handleSubmit}
        >
          라고생각
        </Button>
      </div>
    );
  }
}

CommentInput.propTypes = {
};

export default CommentInput;
