import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { GlobalNavbar } from '../components/contrib';

const SettingsContainer = () => (
  <div id="settings" className="react-container">
    <ListGroup>
      <ListGroupItem>프로필 수정</ListGroupItem>
      <ListGroupItem href="/api/v1/auth/logout">로그아웃</ListGroupItem>
    </ListGroup>
    <GlobalNavbar />
  </div>
);

export default SettingsContainer;
