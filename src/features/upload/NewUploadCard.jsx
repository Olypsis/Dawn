import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

// SubComponents
import UploadForm from './NewUploadForm';
import RadioButtonForm from '../../components/forms/RadioButtonForm';
import UploadCardHeaderContainer from './UploadCardHeaderContainer';

class UploadCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expanded: false, message: '', publicKey: '' };
	}

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	// Send a message
	sendMessage = e => {
		e.preventDefault();
		const { ipfsAddedFile, encryptedFile } = this.props.upload;

		// Construct payload from IPFS and encrypted file data redux store
		const payload = {
			hash: ipfsAddedFile.fileHash,
			path: ipfsAddedFile.filePath,
			key: encryptedFile.decryptionKey,
			iv: encryptedFile.decryptionIv,
			note: this.state.message ? this.state.message : '',
		};

		if (payload.hash === '' || payload.path === '' || payload.iv === '') {
			return alert('Upload a file before sending through whisper!');
		}

		// this.props.sendMessage(payload, this.state.form.publicKey);
		this.props.sendStatusMessage(payload, this.state.publicKey);
	};

	render() {
		const { classes } = this.props;
		console.log("props", this.props)

		return (
			<Card className={classes.card}>
				{/*  Upload Header  */}
				<UploadCardHeaderContainer />
				<Divider />
				{/*  Upload Form  */}
				<CardContent>
					<UploadForm onSubmit={this.sendMessage}>
						{/* Expand Button + Options - passed in as children*/}
						<CardActions className={classes.actions} disableActionSpacing>
							<div className={'app-form-actions'}>
								<button type={'submit'} className={'app-button primary'}>
									Send to Peer
								</button>
							</div>
							<IconButton
								className={classnames(classes.expand, {
									[classes.expandOpen]: this.state.expanded,
								})}
								onClick={this.handleExpandClick}
								aria-expanded={this.state.expanded}
								aria-label="Show more"
							>
								<ExpandMoreIcon />
							</IconButton>
						</CardActions>
						<Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
							<CardContent>
								<Divider />
								<RadioButtonForm />
								<Divider variant="middle" />
							</CardContent>
						</Collapse>
					</UploadForm>
				</CardContent>
			</Card>
		);
	}
}

UploadCard.propTypes = {
	classes: PropTypes.object.isRequired,
	sendStatusMessage: PropTypes.func.isRequired,
	upload: PropTypes.object.isRequired,
};

export default UploadCard;
