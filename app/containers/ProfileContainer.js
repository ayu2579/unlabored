import React, { PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Tab, ButtonGroup, Button } from 'react-bootstrap';
import { Summary } from '../components/profile';

const ProfileContainer = ({ children }) => (
  <div id="profile" className="react-container">
    <Summary />
    <Tab.Container id="profile-tab">
      <ButtonGroup justified>
        <LinkContainer to="/@riverleo/feeds">
          <Button>feed</Button>
        </LinkContainer>
        <LinkContainer to="/@riverleo/ratings">
          <Button>rating</Button>
        </LinkContainer>
      </ButtonGroup>
    </Tab.Container>
    {children}
  </div>
);

ProfileContainer.propTypes = {
  children: PropTypes.node,
};

export default ProfileContainer;
