import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import {
  AppContainer, LoginContainer, TopicContainer, ExploreContainer,
  ProfileContainer, SearchContainer, NotificationContainer, NoMatchContainer,
} from './containers';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRedirect to="explore" />
    <Route path="login" component={LoginContainer} />
    <Route path="search" component={SearchContainer} />
    <Route path="topics/:id" component={TopicContainer} />
    <Route path="explore" component={ExploreContainer} />
    <Route path="profile" component={ProfileContainer} />
    <Route path="notifications" component={NotificationContainer} />
    <Route path="*" component={NoMatchContainer} />
  </Route>
);

export default routes;
