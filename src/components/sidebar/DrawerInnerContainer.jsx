import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// SubComponents
import DrawerInnerMessageTable from './DrawerInnerTable';
import DrawerInnerAccountPage from './DrawerInnerAccountPage';

class DrawerInnerContainer extends Component {
	render() {
		return (
				<Switch>
					<Route
						path="/messages"
						render={() => <DrawerInnerMessageTable />}
					/>
					)} />
					<Route
						path="/account"
						render={() => <DrawerInnerAccountPage />}
					/>
				</Switch>
		);
	}
}


export default DrawerInnerContainer;
