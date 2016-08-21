import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import {
  AppContainer, CreateContainer, ExploreContainer,
  ProfileContainer, WelcomeContainer, NoMatchContainer,
} from './containers';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRedirect to="explore" />
    <Route path="create" component={CreateContainer} />
    <Route path="explore" component={ExploreContainer} />
    <Route path="@:username" component={ProfileContainer} />
    <Route path="welcome" component={WelcomeContainer} />
    <Route path="*" component={NoMatchContainer} />
  </Route>
);

export default routes;
