import React, { Component } from 'react';

// Material-UI
import CardContent from '@material-ui/core/CardContent';

// Sub Components
import IndeterminateSpinner from '../../components/spinners/IndeterminateSpinner';


export default class TransferProgressCardContent extends Component {
	render() {
		const { transferStatus } = this.props;
		const { isUploading, isEncrypting, isAddingToIPFS, isSendingMessage } = transferStatus; 

		let transferStatusMessage;
		if (isUploading) {
			console.log("isUploading");
			transferStatusMessage = 'Uploading...';

		}
		if (isEncrypting) {
			console.log("isEncrypting");
			transferStatusMessage = 'Encrypting...';
		}
		if (isAddingToIPFS) {
			console.log("isAddingToIPFS");
			transferStatusMessage = 'Adding to IPFS...';
		}
		if (isSendingMessage) {
			console.log("isSendingMessage");
			transferStatusMessage = 'Sending Message over Status...';
		}

		return (
			<CardContent>
				<IndeterminateSpinner />
				<p> {transferStatusMessage} </p>
			</CardContent>
		);
	}
}
