import { Route, BrowserRouter, Switch } from 'react-router-dom';

import React from 'react';
// import DrawerInnerTable from './Homepage';
import MessagePage from './MessagePage';

import SidebarParent from '../../components/sidebar/SidebarParent';

export default () => (
	<Route exact path="/messages" component={MessagePage} />
);
// export default () => <Route exact path="/account" component={Homepage} />;
// export default () => <Route exact path="/download" component={Homepage} />;
