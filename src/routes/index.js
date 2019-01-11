import { BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';
// import NotFoundPage from '../components/404/404Page/'

import HomeRoute from '../pages/homepage';

export default () => (
  <BrowserRouter>
    <Switch>
      <HomeRoute />
    </Switch>
  </BrowserRouter>
);
