import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// Custom Buttons
import Button from '../buttons/DefaultButton';
import BadgedButton from '../buttons/BadgedButton';
import IdenticonButton from '../buttons/IdenticonButton';

// Material-UI
import { withStyles } from '@material-ui/core/styles';

// Context API
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
	menuButton: {
		marginTop: 20,
		marginBottom: 20,
		marginLeft: 12,
		marginRight: 20,
		float: 'right',
		color: 'blue',
	},
	navContainer: {
		display: 'flex',
		marginLeft: 12,
		marginRight: 20,
		float: 'right',
		'z-index': 3000,
		position: 'absolute',
		top: '0px',
		right: '0px',
	},
	hide: {
		display: 'none',
	},
});

class SidebarNav extends Component {
	handleDrawerToggleClick = (
		event,
		toggleDrawer,
		openDrawer,
		closeDrawer,
		open,
		hashname,
		to,
	) => {
		// Drawer is closed
		// console.log('SidebarNav:', open);
		if (!open) {
			// console.log('SidebarNav:', open);
			openDrawer();
		} else {
			// Drawer is open but link is already open - toggle drawer
			if (hashname === to) {
				console.log('ROUTE ALREADY OPEN - TOGGLE DRAWER');
				return toggleDrawer();
			} else {
				console.log(`CATCHALL: hashname: ${hashname} - to: ${to}`);
				return;
			}
		}
	};

	handleAboutClick = () => {
		alert('About Modal');
	};

	validateLocation = (location, open, to) => {
		if (location.pathname === to && open) return '/';
		return to;
	};

	render() {
		const { classes, location } = this.props;
		return (
			<SidebarContext.Consumer>
				{context => {
					const {
						toggleDrawer,
						openDrawer,
						closeDrawer,
						sidebar,
						notifications
						// events
					} = context;

					let numReceivedMessages =  notifications.newMessageNum;
;
					return (
						<Fragment>
							<div className={classes.navContainer}>
								<Button
									onClick={this.handleAboutClick}
									className={classes.menuButton}
								>
									About
								</Button>

								<Link
									to={this.validateLocation(
										location,
										sidebar.open,
										'/messages',
									)}
								>
									<BadgedButton
										onClick={e =>
											this.handleDrawerToggleClick(
												e,
												toggleDrawer,
												openDrawer,
												closeDrawer,
												sidebar.open,
												location.pathname,
												'/messages',
											)
										}
										className={classes.menuButton}
										badgeNum={numReceivedMessages}
									>
										My Wallet
									</BadgedButton>
								</Link>

								<Link
									to={this.validateLocation(
										location,
										sidebar.open,
										'/account',
									)}
								>
									<IdenticonButton
										onClick={e =>
											this.handleDrawerToggleClick(
												e,
												toggleDrawer,
												openDrawer,
												closeDrawer,
												sidebar.open,
												location.pathname,
												'/account',
											)
										}
										className={classes.menuButton}
									/>
								</Link>
							</div>
						</Fragment>
					);
				}}
			</SidebarContext.Consumer>
		);
	}
}

SidebarNav.propTypes = {
	classes: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SidebarNav));
