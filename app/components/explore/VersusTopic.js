import _ from 'lodash';
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import { Item } from '.';

class VersusTopic extends Component {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect() {
  }

  render() {
    const { kind, items, color } = this.props.topic;

    return (
      <div
        className={
          classNames({
            [kind]: true,
            'versus-topic': true,
          })
        }
        style={_.isEqual(kind, 'text') ? { backgroundColor: color } : undefined}
      >
        {
          _.map(items, item =>
            <Col key={item.id} xs={6}>
              <Item
                kind={kind}
                item={item}
                onClick={this.handleSelect}
              />
            </Col>
          )
        }
      </div>
    );
  }
}

VersusTopic.propTypes = {
  topic: PropTypes.shape({
    kind: PropTypes.oneOf(['text', 'image']),
    items: PropTypes.array,
    color: PropTypes.string,
  }).isRequired,
};

export default VersusTopic;
