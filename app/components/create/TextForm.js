import React from 'react';
import store from '../../store';
import { ItemCreator, ColorPicker } from '.';

const TextForm = () => {
  const { selectedColor } = store.getState().create;

  return (
    <div className="text-form">
      <div
        className="items"
        style={{ backgroundColor: selectedColor }}
      >
        <div className="inputs">
          <ItemCreator type="text" direction="left" />
          <ItemCreator type="text" direction="right" />
        </div>

        <ColorPicker />
      </div>
    </div>
  );
};

export default TextForm;
