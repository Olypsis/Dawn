import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
	handleDrawerToggleClick = (toggleDrawer, open) => {
		toggleDrawer();
	};

	render() {
		const { classes } = this.props;
		return (
			<SidebarContext.Consumer>
				{context => {
					return (
						<div className={classes.drawerHeader}>
							<IconButton
								onClick={() =>
									this.handleDrawerToggleClick(
										context.toggleDrawer,
										context.sidebar.open
									)
								}
							>
								<ChevronLeftIcon />
							</IconButton>
							<IdenticonButton />
							<span>
								{context.whisper.statusDetails.publicKey}
							</span>
						</div>
					);
				}}
			</SidebarContext.Consumer>
		);
	}
}

DrawerHeader.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerHeader);
