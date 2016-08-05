import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  AppContainer, EvalContainer, FeedContainer, NoMatchContainer,
  ProfileContainer, WelcomeContainer,
} from './containers';

const routes = (
  <Route path="/" component={AppContainer}>
    <IndexRoute component={FeedContainer} />
    <Route path="eval" component={EvalContainer} />
    <Route path="feed" component={FeedContainer} />
    <Route path="profile" component={ProfileContainer} />
    <Route path="welcome" component={WelcomeContainer} />
    <Route path="*" component={NoMatchContainer} />
  </Route>
);

export default routes;
