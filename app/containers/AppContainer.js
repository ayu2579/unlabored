import React, { PropTypes } from 'react';

const AppContainer = ({ children }) => (
  <div>{children}</div>
);

AppContainer.propTypes = {
  children: PropTypes.node,
};

export default AppContainer;
