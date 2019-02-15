import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

// store
import store from '../../state/store';

// utils
import isEmpty from '../../util/is-empty';

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
			burnerAccount: {
				burnerPrivateKey: '',
				burnerKeyPairId: '',
				burnerPublicKey: '',
				burnerLink: '',
			},
			formType: 'whisper',
		};
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	// Encrypts file, then sends a message
	handleFormSubmit = encryptAndAddFile => async e => {
		e.preventDefault();
		const { formType, publicKey, message, burnerAccount } = this.state;

		if (formType === 'whisper') {
			if (isEmpty(publicKey))
				return alert('Please provide a proper public key!');
			return await encryptAndAddFile(publicKey, message, burnerAccount);
		} else {
			return await encryptAndAddFile(
				burnerAccount.burnerPublicKey,
				message,
				burnerAccount,
			);
		}
	};

	formChanged = async formType => {
		if (formType === 'link') {
			// Form is link
			// 1. Create burner account
			const burnerAccount = await this.generateLink();
			// 2. Set Public key to form
			console.log('burnerAccount', burnerAccount);
			this.setState({ formType: 'link', burnerAccount });
		} else {
			// Form is whisper
			console.log('formChanged: formType:', formType);
			this.setState({ publicKey: '', formType: 'whisper' });
		}
	};

	async generateLink() {
		const { shh } = store.getState().whisper.status;
		try {
			// Generate a random keyPairId
			const tempKeypairId = await shh.newKeyPair();
			// This is our Private Key: What we send through link - generates new account below
			const burnerPrivateKey = await shh.getPrivateKey(tempKeypairId);
			// This is the keypairId we generate using privKey
			const burnerKeyPairId = await shh.addPrivateKey(burnerPrivateKey);
			// this is pubkey we send msg to
			const burnerPublicKey = await shh.getPublicKey(burnerKeyPairId);

			console.log(
				'Burner account:',
				'keypairId:',
				burnerKeyPairId,
				'publicKey:',
				burnerPublicKey,
				'privateKey',
				burnerPrivateKey,
			);
			// Generate Link
			// FIXME Change to none localhost link
			let { href } = window.location;
			href = href.substring(0, href.lastIndexOf('/') + 1);
			const burnerLink = href + '?pkey=' + burnerPrivateKey;
			return { burnerPrivateKey, burnerKeyPairId, burnerPublicKey, burnerLink };
		} catch (err) {
			console.log(err);
		}
	}

	async componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if (nextProps.formType !== this.state.formType) {
			await this.formChanged(nextProps.formType);
		}
	}

	render() {
		const { classes, children, encryptAndAddFile } = this.props;

		let renderFormLink;
		if (this.state.formType === 'link') {
			// console.log("renderFormLink: is Link: ", this.state.formType);
			renderFormLink = (
				<TextField
					disabled
					id="public-key-textfield"
					label="Public Key"
					className={classes.textField}
					value={this.state.burnerAccount.burnerPublicKey}
					margin="normal"
				/>
			);
		} else {
			// console.log("renderFormLink: is not link", this.state.formType)
			renderFormLink = (
				<TextField
					id="public-key-textfield"
					label="Public Key"
					className={classes.textField}
					value={this.state.publicKey}
					onChange={this.handleChange('publicKey')}
					margin="normal"
				/>
			);
		}
		return (
			<form
				className={classes.container}
				onSubmit={e => this.handleFormSubmit(encryptAndAddFile)(e)}
				noValidate
				autoComplete="off"
			>
				{renderFormLink}
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
	encryptAndAddFile: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadForm);
