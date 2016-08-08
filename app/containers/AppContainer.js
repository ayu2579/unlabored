import React, { PropTypes } from 'react';
import { GlobalNavbar } from '../components/contrib';

const AppContainer = ({ children }) => (
  <div id="app" className="react-root-container">
    <GlobalNavbar />

    {children}
  </div>
);

AppContainer.propTypes = {
  children: PropTypes.node,
};

export default AppContainer;
