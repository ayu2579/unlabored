import React, { PropTypes } from 'react';
import { TabBar } from '../components/contrib';

const AppContainer = ({ children }) => (
  <div id="app" className="react-root-container">
    {children}

    <TabBar />
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.node,
};

export default AppContainer;
