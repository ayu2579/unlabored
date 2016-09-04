import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { AutoResizeInput } from '../contrib';

class CommentInput extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
  }

  render() {
    return (
      <div id="comment-input">
        <AutoResizeInput
          type="textarea"
        />
        <Button>전송</Button>
      </div>
    );
  }
}

CommentInput.propTypes = {
};

export default CommentInput;
