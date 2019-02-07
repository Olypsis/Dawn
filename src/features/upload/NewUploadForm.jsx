import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

// store
// import store from "../../state/store";

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
			burnerLink: '',
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
		const { publicKey, message, burnerLink } = this.state;
		if (isEmpty(publicKey)) return alert('Please provide a proper public key!');

		await encryptAndAddFile(publicKey, message, burnerLink);
	};

	formChanged = async formType => {
		if (formType === 'link') {
			// Form is link
			// 1. Create burner account
			const {
				// newKeyPairId,
				newPubKey,
				// burnerpKey,
				burnerLink,
			} = await this.props.generateLink();
			// 2. Set Public key to form
			console.log('pubkey', newPubKey, burnerLink);
			this.setState({ publicKey: newPubKey, formType: 'link', burnerLink });
		} else {
			// Form is whisper
			console.log('formChanged: formType:', formType);
			this.setState({ publicKey: '', formType: 'whisper' });
		}
	};

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
					value={this.state.publicKey}
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
