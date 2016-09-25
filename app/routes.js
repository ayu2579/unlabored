import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import {
  AppContainer, LoginContainer, TopicContainer, ExploreContainer, SettingsContainer,
  ProfileContainer, SearchContainer, NotificationContainer, NoMatchContainer,
} from './containers';
import * as explore from './containers/explore';

const routes = (
  <Route path="/" component={AppContainer}>
    <Route path="explore" component={ExploreContainer}>
      <Route path="me" component={explore.MeContainer} />
      <Route path="latest" component={explore.LatestContainer} />
      <Route path="feature" component={explore.FeatureContainer} />
      <IndexRedirect to="latest" />
    </Route>
    <Route path="login" component={LoginContainer} />
    <Route path="search" component={SearchContainer} />
    <Route path="topics/:id" component={TopicContainer} />
    <Route path="explore" component={ExploreContainer} />
    <Route path="@:username" component={ProfileContainer} />
    <Route path="profile" component={ProfileContainer} />
    <Route path="settings" component={SettingsContainer} />
    <Route path="notifications" component={NotificationContainer} />
    <Route path="*" component={NoMatchContainer} />
    <IndexRedirect to="explore" />
  </Route>
);

export default routes;
