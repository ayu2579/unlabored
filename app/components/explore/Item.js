import _ from 'lodash';

import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import { exploreAction } from '../../actions';

class Item extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(e) {
    const { item, onSelect } = this.props;

    exploreAction.select(item);
    onSelect(e);
  }

  render() {
    const { kind, item } = this.props;
    const { text, images } = item;

    return (
      <Button
        className="item"
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
  onSelect: () => {},
};

Item.propTypes = {
  kind: PropTypes.oneOf(['text', 'image']),
  item: PropTypes.shape({
    text: PropTypes.string,
    images: PropTypes.array,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Item;
