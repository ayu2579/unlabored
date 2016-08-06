import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import {
  AppContainer, FeedContainer, NoMatchContainer,
  ProfileContainer, RatingContainer, WelcomeContainer,
} from './containers';
import * as profile from './containers/profile';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRedirect to="feeds" />
    <Route path="ratings" component={RatingContainer} />
    <Route path="feeds" component={FeedContainer} />
    <Route path="@:username" component={ProfileContainer}>
      <IndexRedirect to="feeds" />
      <Route path="feeds" component={profile.FeedContainer} />>
      <Route path="ratings" component={profile.RatingContainer} />>
    </Route>
    <Route path="welcome" component={WelcomeContainer} />
    <Route path="*" component={NoMatchContainer} />
  </Route>
);

export default routes;
