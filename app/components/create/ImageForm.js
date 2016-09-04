import React, { Component } from 'react';
import { ItemCreator } from '.';

class ImageForm extends Component {
  getValue() {
  }

  render() {
    return (
      <div className="image-form">
        <div className="items">
          <ItemCreator type="image" direction="left" />
          <ItemCreator type="image" direction="right" />
        </div>
      </div>
    );
  }
}

export default ImageForm;
