import React, { Component } from 'react';
import { Input } from 'react-bootstrap';
import { Dropzone } from 'react-dropzone';

class NewContainer extends Component {
  handleDrop() {
  }

  render() {
    return (
      <div id="new" className="react-container">
        <Dropzone className="dropzone">
          이미지 업로드
        </Dropzone>
        <Dropzone className="dropzone">
          이미지 업로드
        </Dropzone>
        <Input
          ref="title"
          type="text"
          placeholder="내용적어"
        />
        <Input
          ref="type"
          type="select"
        >
          <option value="versus">versus</option>
        </Input>
      </div>
    );
  }
}

export default NewContainer;
