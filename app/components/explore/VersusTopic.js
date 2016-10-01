import _ from 'lodash';
import classNames from 'classnames';

import React, { PropTypes } from 'react';
import { Col } from 'react-bootstrap';
import { Item } from '.';

const VersusTopic = ({ topic, disabled, onSelect }) => {
  const { kind, items, color } = topic;

  return (
    <div
      className={
        classNames({
          [kind]: true,
          'versus-topic': true,
          disabled,
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
              topic={topic}
              disabled={disabled}
              onSelect={onSelect}
            />
          </Col>
        )
      }
    </div>
  );
};

VersusTopic.defaultProps = {
  disabled: false,
  onSelect: () => {},
};

VersusTopic.propTypes = {
  topic: PropTypes.shape({
    kind: PropTypes.oneOf(['text', 'image']),
    items: PropTypes.array,
    color: PropTypes.string,
    selection: PropTypes.object,
  }).isRequired,
  disabled: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default VersusTopic;
