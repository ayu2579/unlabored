import React from 'react';
import { GlobalNavbar, NavigationBar } from '../components/contrib';

const NotificationContainer = () => (
  <div id="notification" className="react-container">
    <NavigationBar title="알림" />
    <GlobalNavbar />
  </div>
);

export default NotificationContainer;
