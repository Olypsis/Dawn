import React, { Component } from 'react';

// Custom Component
import IdenticonButton from '../buttons/IdenticonButton';

// Material-UI
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles } from '@material-ui/core/styles';

// Context API
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
	},
});

class DrawerHeader extends Component {
	render() {
		const { classes, ...props } = this.props;
		return (
			<SidebarContext.Consumer>
				{context => {
					console.log('DrawerHeader: statusDetails:', context.whisper.statusDetails);
					return (
						<div className={classes.drawerHeader}>
							<IconButton onClick={props.handleDrawerOpen}>
								<ChevronLeftIcon />
							</IconButton>
							<span> Your Files </span>
							<IdenticonButton />
							<span>
								{context.whisper.statusDetails.username}
							</span>
						</div>
					);
				}}
			</SidebarContext.Consumer>
		);
	}
}

export default withStyles(styles)(DrawerHeader);
