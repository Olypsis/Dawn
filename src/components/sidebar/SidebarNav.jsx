import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types"

// Custom Buttons
import Button from '../buttons/DefaultButton';
import IdenticonButton from '../buttons/IdenticonButton';


// Material-UI
import { withStyles } from '@material-ui/core/styles';

// Context API
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
	root: {
		display: 'flex',
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
		float: 'right',
	},
	hide: {
		display: 'none',
	},
});

class SidebarNav extends Component {
	handleDrawerToggleClick = toggleDrawer => {
		toggleDrawer();
	};

	handleAboutClick = () => {
		alert('About Modal');
	};

	render() {
		const { classes } = this.props;
		return (
			<SidebarContext.Consumer>
				{context => {
					return (
						<Fragment>
							<Button
								onClick={this.handleAboutClick}
								className={classes.menuButton}
							>
								About
							</Button>

							<Link to="/messages">
								<Button
									onClick={() =>
										this.handleDrawerToggleClick(
											context.toggleDrawer,
										)
									}
									className={classes.menuButton}
								>
									My Wallet
								</Button>
							</Link>

							<Link to="/account">
								<IdenticonButton
									onClick={() =>
										this.handleDrawerToggleClick(
											context.toggleDrawer,
										)
									}
								/>
							</Link>
						</Fragment>
					);
				}}
			</SidebarContext.Consumer>
		);
	}
}

SidebarNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SidebarNav);
