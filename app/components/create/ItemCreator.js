import _ from 'lodash';
import classNames from 'classnames';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { createAction } from '../../actions';
import { AutoResizeInput } from '../../components/contrib';

export class ItemCreator extends Component {
  constructor(props) {
    super(props);

    this.handleBlur = this.handleBlur.bind(this);
  }

  handleBlur() {
    const { direction, dispatch, type } = this.props;
    const text = this.text.getValue();

    dispatch(createAction.saveItem(direction, { kind: type, text }));
  }

  handleDrop(files) {
    const { direction, dispatch, type } = this.props;

    dispatch(createAction.saveItem(direction, { kind: type, image: files[0] }));
  }

  render() {
    const { type, direction, create } = this.props;
    const item = create[`${direction}Item`];
    const status = create[`${direction}ItemStatus`];
    const backgroundImage = `url("${_.get(item, 'images[0].url')}")`;

    return (
      <div
        className={
          classNames({
            [type]: true,
            'item-creator': true,
            uploaded: !_.isEmpty(item),
          })
        }
      >
        {
          (() => {
            if (_.isEqual(type, 'image')) {
              return (
                <Dropzone
                  className="dropzone"
                  onDrop={files => this.handleDrop(files)}
                  disableClick={_.isEqual(status, 'request')}
                >
                  {
                    (() => {
                      if (_.isEqual(status, 'request')) {
                        return <p className="emptystate">올리는 중...</p>;
                      }

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

            return (
              <AutoResizeInput
                ref={c => (this.text = c)}
                type="textarea"
                onBlur={this.handleBlur}
                placeholder="내용적어"
              />
            );
          })()
        }
      </div>
    );
  }
}

ItemCreator.propTypes = {
  create: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['text', 'image']).isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default connect(state => ({ create: state.create }))(ItemCreator);
