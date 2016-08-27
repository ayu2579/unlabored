import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { meAction } from '../actions';
import { LoginContainer, CreateContainer } from '.';

class AppContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(meAction.get());
  }

  render() {
    const { children, me, login, create } = this.props;

    if (_.includes(['waiting', 'request'], me.status)) {
      return <div />;
    }

    return (
      <div
        id="app"
        className="react-root-container"
      >
        {children}

        {login.show && <LoginContainer />}
        {create.show && <CreateContainer />}
      </div>
    );
  }
}

AppContainer.propTypes = {
  me: PropTypes.shape({
    data: PropTypes.object.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  login: PropTypes.shape({
    show: PropTypes.bool.isRequired,
  }).isRequired,
  create: PropTypes.shape({
    show: PropTypes.bool.isRequired,
  }).isRequired,
  dispatch: PropTypes.func,
  children: PropTypes.node,
};

export default connect(state => _.pick(state, ['me', 'login', 'create']))(AppContainer);
