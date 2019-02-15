import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';

// Sub Components
import IndeterminateSpinner from '../../components/spinners/IndeterminateSpinner';

const styles = theme => ({
	cardContent: {
		height: 300,
		display: 'flex',
  		'justify-content': 'center',
  		'align-items': 'center',
	},
	transferProgress: {
		margin: 'auto',
	},
});

class TransferProgressCardContent extends Component {
	render() {
		const { transferStatus, classes } = this.props;
		const {
			isUploading,
			isEncrypting,
			isAddingToIPFS,
			isSendingMessage,
		} = transferStatus;

		let transferStatusMessage;
		if (isUploading) {
			console.log('isUploading');
			transferStatusMessage = 'Uploading...';
		}
		if (isEncrypting) {
			console.log('isEncrypting');
			transferStatusMessage = 'Encrypting...';
		}
		if (isAddingToIPFS) {
			console.log('isAddingToIPFS');
			transferStatusMessage = 'Adding to IPFS...';
		}
		if (isSendingMessage) {
			console.log('isSendingMessage');
			transferStatusMessage = 'Sending Message over Status...';
		}

		return (
			<CardContent className={classes.cardContent}>
				<div className={classes.transferProgress}>
				<IndeterminateSpinner />
				<p> {transferStatusMessage} </p>
				</div>
			</CardContent>
		);
	}
}

TransferProgressCardContent.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransferProgressCardContent);
