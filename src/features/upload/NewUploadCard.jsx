import React, { Fragment } from 'react';
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
import IndeterminateSpinner from '../../components/spinners/IndeterminateSpinner';

class UploadCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { expanded: false, message: '', publicKey: '' };
	}

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const {
			classes,
			sendStatusMessage,
			encryptAndAddFile,
			upload,
		} = this.props;
		// console.log("props", this.props)

		const renderedCardContent = upload.uploading ? (
			<IndeterminateSpinner />
		) : (
			<Fragment>
				{/*  Upload Header  */}
				<UploadCardHeaderContainer />
				<Divider />
				{/*  Upload Form  */}
				<CardContent>
					<UploadForm
						upload={upload}
						sendStatusMessage={sendStatusMessage}
						encryptAndAddFile={encryptAndAddFile}
					>
						{/* Expand Button + Collapse - passed into form as children */}
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
			</Fragment>
		);

		return <Card className={classes.card}>{renderedCardContent}</Card>;
	}
}

UploadCard.propTypes = {
	classes: PropTypes.object.isRequired,
	sendStatusMessage: PropTypes.func.isRequired,
	upload: PropTypes.object.isRequired,
};

export default UploadCard;
