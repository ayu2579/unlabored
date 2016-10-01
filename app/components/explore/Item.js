import _ from 'lodash';
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import store from '../../store';
import { exploreAction } from '../../actions';

class Item extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const { item, topic, onSelect } = this.props;
    const { itemId } = topic.selection || {};
    const action = _.isEqual(item.id, itemId) ? 'deselect' : 'select';
    const promise = store.dispatch(exploreAction[action](item));

    onSelect(e, promise);
  }

  render() {
    const { kind, item, topic, disabled } = this.props;
    const { text, images } = item;
    const { itemId } = topic.selection || {};

    return (
      <Button
        disabled={disabled}
        className={
          classNames({
            item: true,
            selected: _.isEqual(item.id, itemId),
          })
        }
        onClick={this.handleSelect}
      >
        {
          (() => {
            if (_.isEqual(kind, 'image')) {
              return (
                <div
                  className="image"
                  style={{
                    backgroundImage: `url('${images[0].url}')`,
                  }}
                />
              );
            }

            return <div className="text">{text}</div>;
          })()
        }
      </Button>
    );
  }
}

Item.defaultProps = {
  disabled: false,
  onSelect: () => {},
};

Item.propTypes = {
  kind: PropTypes.oneOf(['text', 'image']),
  item: PropTypes.shape({
    text: PropTypes.string,
    images: PropTypes.array,
  }).isRequired,
  topic: PropTypes.shape({
    selection: PropTypes.object,
  }),
  disabled: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Item;
