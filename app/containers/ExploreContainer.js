import React, { PropTypes } from 'react';
import { GlobalNavbar, NavigationBar } from '../components/contrib';

const ExploreContainer = ({ children }) => (
  <div id="explore" className="react-container">
    <NavigationBar
      leftItems={[
        {
          title: '누가뭘올렸나봐',
          to: '/explore/latest',
        },
        {
          title: '히트다히트',
          to: '/explore/feature',
        },
        {
          title: '내가골랐었나봐',
          to: '/explore/me',
        },
      ]}
    />

    {children}

    <GlobalNavbar />
  </div>
);

ExploreContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExploreContainer;
