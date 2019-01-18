import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// SubComponents
import DrawerInnerMessageTable from './DrawerInnerTable';
import DrawerInnerAccountPage from './DrawerInnerAccountPage';

class DrawerInnerContainer extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route
						exact
						path="/messages"
						render={() => <DrawerInnerMessageTable />}
					/>
					)} />
					<Route
						exact
						path="/account"
						render={() => <DrawerInnerAccountPage />}
					/>
				</Switch>
			</BrowserRouter>
		);
	}
}


export default DrawerInnerContainer;
