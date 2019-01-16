import { BrowserRouter, Switch } from 'react-router-dom';
import React from 'react';

import SidebarRoutes from '../pages/sidebar';


export default () => (
  <BrowserRouter>
    <Switch>
      <SidebarRoutes />
    </Switch>
  </BrowserRouter>
);