import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Tab, ButtonGroup, Button } from 'react-bootstrap';

const TabBar = () => (
  <Tab.Container id="tab-bar">
    <ButtonGroup justified>
      <LinkContainer to="/feeds">
        <Button>feed</Button>
      </LinkContainer>
      <LinkContainer to="/ratings">
        <Button>rating</Button>
      </LinkContainer>
      <LinkContainer to="/@riverleo">
        <Button>profile</Button>
      </LinkContainer>
    </ButtonGroup>
  </Tab.Container>
);

export default TabBar;
