import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
	close: {
		padding: theme.spacing.unit / 2,
	},
	container: {
		"background-color": "red"
	}
});

class ConsecutiveSnackbars extends React.Component {

	handleClick = message => () => {
		this.props.pushNotificationToQueue(message);
	};

	handleClose = (event, reason) => {

		// if (reason === 'clickaway') {
		// 	console.log("ConsecutiveSnackbars: handleClose:", "err: reason: clickaway")
		// 	return;
		// }
		console.log("ConsecutiveSnackbars: handleClose:", "closing")
		this.props.closeNotification();
	};

	handleExited = () => {
		this.props.processQueue();
	};

	render() {
		const { classes, notifications } = this.props;
		const { messageInfo, open } = notifications;

		return (
			<div className={classes.container}>
				<Button onClick={this.handleClick('message a')}>
					Show message A
				</Button>
				<Button onClick={this.handleClick('message b')}>
					Show message B
				</Button>
				<Snackbar
					key={messageInfo.key}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={open}
					autoHideDuration={6000}
					onClose={this.handleClose}
					onExited={this.handleExited}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}
					message={<span id="message-id">{messageInfo.message}</span>}
					action={[
						<Button
							key="undo"
							color="secondary"
							size="small"
							onClick={this.handleClose}
						>
							VIEW
						</Button>,
						<IconButton
							key="close"
							aria-label="Close"
							color="inherit"
							className={classes.close}
							onClick={this.handleClose}
						>
							<CloseIcon />
						</IconButton>,
					]}
				/>
			</div>
		);
	}
}

ConsecutiveSnackbars.propTypes = {
	classes: PropTypes.object.isRequired,
	processQueue: PropTypes.func.isRequired,
	openNotification: PropTypes.func.isRequired,
	closeNotification: PropTypes.func.isRequired,
	pushNotificationToQueue: PropTypes.func.isRequired,
};

export default withStyles(styles)(ConsecutiveSnackbars);
