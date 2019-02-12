import React, { Component, Fragment } from 'react';

// SubComponents
import IndeterminateSpinner from '../spinners/IndeterminateSpinner';

// Metamask Feature
import ConnectMetamaskContainer from '../../features/account/ConnectMetamaskContainer';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Context API
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
		width: '100%',
		'overflow-wrap': 'word-break',
	},
	drawerInnerContentHeader: {
		paddingLeft: theme.spacing.unit * 2,
	},
	innerText: {
		'overflow-wrap': 'word-break',
	},
	spinner: {
		marginLeft: 'auto',
		marginRight: 'auto',
		width: '100%',
	},
});

class DrawerInnerAccountPage extends Component {
	componentDidMount() {
		// console.log('DrawerInnerAccountPage: componentDidMount');
	}
	render() {
		// console.log('DrawerInnerAccountPage: render');
		const { classes } = this.props;
		return (
			<SidebarContext.Consumer>
				{context => {
					let renderedAccount = context.whisper.isLoggingIn ? (
						<IndeterminateSpinner className={classes.spinner} />
					) : (
						<Fragment>
							<Paper className={classes.root} elevation={1}>
								<Typography variant="h5" component="h3">
									Your Username
								</Typography>
								<Typography component="p">
									{context.whisper.statusDetails.username}
								</Typography>
							</Paper>
							<Paper className={classes.root} elevation={1}>
								<Typography variant="h5" component="h3">
									Your Public Key
								</Typography>
								<Typography component="p">
									{context.whisper.statusDetails.publicKey}
								</Typography>
							</Paper>
						</Fragment>
					);

						return (
						<Fragment>
							<h3 className={classes.drawerInnerContentHeader}>Account</h3>
							{renderedAccount}

							<ConnectMetamaskContainer />
						</Fragment>
					);
				}}
			</SidebarContext.Consumer>
		);
	}
}

export default withStyles(styles)(DrawerInnerAccountPage);
