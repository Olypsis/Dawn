import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Custom Button Component
import IdenticonButton from '../buttons/IdenticonButton';
// import Button from '../buttons/DefaultButton';

// Material-UI
import Drawer from '@material-ui/core/Drawer';

// Material-UI
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

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
		padding: theme.spacing.unit * 3,
		marginRight: -drawerWidth
	}

});

class DrawerContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fileBrowserHeading: 'Messages',
		};
	}
	render() {
		const { classes, ...props } = this.props;
		return (
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="right"
				open={props.open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				{/*  Header  */}
				<div className={classes.drawerHeader}>
					<IconButton onClick={props.handleDrawerOpen}>
						<ChevronLeftIcon />
					</IconButton>
					<span> Your Files </span>
					<IdenticonButton />
				</div>
				<Divider />
				<List>
					{['Messages', 'Your Files'].map((text, index) => (
						<ListItem
							button
							onClick={() => {
								this.setState({
									fileBrowserHeading: text,
								});
							}}
							key={text}
						>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<h3 className={classes.drawerInnerContent}> {this.state.fileBrowserHeading} </h3>
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
		);
	}
}

DrawerContainer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerContainer);
