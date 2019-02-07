import React, { Component } from 'react';

// Material-UI
import CardContent from '@material-ui/core/CardContent';

// Sub Components
import IndeterminateSpinner from '../../components/spinners/IndeterminateSpinner';


export default class TransferProgressCardContent extends Component {
	render() {
		const { transferStatus } = this.props;
		const { isUploading, isEncrypting, isAddingToIPFS } = transferStatus;
		let transferStatusMessage = null; 
		if (isUploading) transferStatusMessage = 'Uploading...';
		if (isEncrypting) transferStatusMessage = 'Encrypting...';
		if (isAddingToIPFS) transferStatusMessage = 'Adding to IPFS...';

		return (
			<CardContent>
					<IndeterminateSpinner />
					<p> {transferStatusMessage} </p>
				</CardContent>
		);
	}
}
