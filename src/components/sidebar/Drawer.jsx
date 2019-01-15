import React, { Component } from 'react';
import PropTypes from 'prop-types';

// SubComponents
import DrawerHeader from './DrawerHeader';
import DrawerInnerMessageContainer from './DrawerInnerContainer';

// Material-UI
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

// Context API

const drawerWidth = '65%';

const styles = theme => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		'z-index': 10,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: '0 8px',
		...theme.mixins.toolbar,
		justifyContent: 'flex-start',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginRight: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginRight: 0,
	},
	hide: {
		display: 'none',
	},
	drawerInnerContent: {
		paddingLeft: '15px',
	},
});

class DrawerContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			innerContentHeading: 'Messages',
		};
	}
	render() {
		const { classes, ...props } = this.props;
		return (
			<Drawer
				className={classes.drawer}
				anchor="right"
				open={props.open}
				variation="persistent"
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				{/*  Header  */}
				<DrawerHeader />
				<Divider variant="middle" />

				{/*  Data Container  */}
				<DrawerInnerMessageContainer
					heading={this.state.innerContentHeading}
				/>
			</Drawer>
		);
	}
}

DrawerContainer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerContainer);
