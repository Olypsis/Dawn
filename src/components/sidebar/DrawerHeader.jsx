import React, { Component } from 'react';
import IdenticonButton from '../buttons/IdenticonButton';

// Material-UI
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


export class DrawerHeader extends Component {
	render() {
		return (
			<div className={classes.drawerHeader}>
					<IconButton onClick={props.handleDrawerOpen}>
						<ChevronLeftIcon />
					</IconButton>
					<span> Your Files </span>
					<IdenticonButton />
				</div>
		);
	}
}
