import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

// store
import store from "../../state/store";

// utils
import isEmpty from "../../util/is-empty"

const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200,
	},
	dense: {
		marginTop: 19,
	},
	menu: {
		width: 200,
	},
});

class UploadForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			publicKey: '',
			message: '',
			multiline: 'Controlled',
			currency: 'EUR',
		};
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	// Send a message
	sendMessage = async (sendStatusMessage) => {
		const { ipfsAddedFile, encryptedFile } = store.getState().upload;

		// Get Public Key from form field
		const { publicKey } = this.state;

		// Construct payload from IPFS and encrypted file data redux store
		const payload = {
			hash: ipfsAddedFile.fileHash,
			path: ipfsAddedFile.filePath,
			key: encryptedFile.decryptionKey,
			iv: encryptedFile.decryptionIv,
			note: this.state.message ? this.state.message : '',
		};

		console.log("sendMessage: payload:", payload, "publicKey:", publicKey)

		if (payload.hash === '' || payload.path === '' || payload.iv === '') {
			return alert('Upload a file before sending through whisper!');
		}

		if (isEmpty(publicKey)) {
			return alert('Input a Public Key!');
		}

		// this.props.sendMessage(payload, this.state.form.publicKey);
		return await sendStatusMessage(payload, this.state.publicKey);
	};

	// Encrypts file, then sends a message
	handleFormSubmit = (
		upload,
		sendStatusMessage,
		encryptAndAddFile,
	) => async e => {
		e.preventDefault();
		await encryptAndAddFile(this.state.publicKey, this.state.message);
		// await this.sendMessage(sendStatusMessage);
	};

	render() {
		const {
			classes,
			children,
			upload,
			sendStatusMessage,
			encryptAndAddFile,
		} = this.props;

		return (
			<form
				className={classes.container}
				onSubmit={e => this.handleFormSubmit(upload, sendStatusMessage, encryptAndAddFile)(e)}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="public-key-textfield"
					label="Public Key"
					className={classes.textField}
					value={this.state.publicKey}
					onChange={this.handleChange('publicKey')}
					margin="normal"
				/>
				<Divider />
				<TextField
					id="message-textfield"
					label="Message"
					className={classes.textField}
					value={this.state.message}
					onChange={this.handleChange('message')}
					margin="normal"
				/>
				{children}
			</form>
		);
	}
}

UploadForm.propTypes = {
	classes: PropTypes.object.isRequired,
	upload: PropTypes.object.isRequired,
	sendStatusMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadForm);
