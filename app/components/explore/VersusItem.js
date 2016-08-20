import React from 'react';
import { Col, Panel } from 'react-bootstrap';

const VersusItem = () => (
  <Panel
    className="versus-item"
    header={
      <div>
        업로드 시간, 업로더 얼굴, 업로더 이름, 좋아요 수
      </div>
    }
  >
    <Col sm={6}>
      A
    </Col>
    <Col sm={6}>
      B
    </Col>
  </Panel>
);

export default VersusItem;
