import _ from 'lodash';
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { createAction as actions } from '../../actions';

export class ItemCreator extends Component {
  handleDrop(files) {
    const { direction, dispatch } = this.props;

    dispatch(actions.saveItem(direction, { image: files[0] }));
  }

  render() {
    const { direction, create } = this.props;
    const item = create[`${direction}Item`];
    const backgroundImage = `url("${_.get(item, 'images[0].url')}")`;

    return (
      <Dropzone
        className="item-creator"
        onDrop={files => this.handleDrop(files)}
      >
        {
          (() => {
            if (_.isEmpty(item)) {
              return <p className="emptystate">뭘올려야<br />물어보지</p>;
            }

            return (
              <div
                className="item"
                style={{ backgroundImage }}
              />
            );
          })()
        }
      </Dropzone>
    );
  }
}

ItemCreator.propTypes = {
  create: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default connect(state => ({ create: state.create }))(ItemCreator);
