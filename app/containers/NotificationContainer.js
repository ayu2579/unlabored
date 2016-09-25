import _ from 'lodash';
import { connect } from 'react-redux';

import React, { Component, PropTypes } from 'react';
import { notificationAction } from '../actions';
import { GlobalNavbar, NavigationBar } from '../components/contrib';
import { NotificationItem } from '../components/notification';

class NotificationContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(notificationAction.fetch());
  }

  render() {
    return (
      <div id="notification" className="react-container">
        <NavigationBar title="누가뭘눌렀어" />
        <NotificationItem />
        <GlobalNavbar />
      </div>
    );
  }
}

NotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notification: PropTypes.shape({
    data: PropTypes.object.isRequired,
  }).isRequired,
};

export default connect(state => _.pick(state, ['notification']))(NotificationContainer);
