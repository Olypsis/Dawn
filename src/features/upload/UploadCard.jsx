import React, { Fragment } from 'react';

// import store from '../../state/store';

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
import UploadForm from './UploadForm';
import RadioButtonForm from '../../components/forms/RadioButtonForm';
import UploadCardHeaderContainer from './UploadCardHeaderContainer';
import TransferFinishedCardContent from './TransferFinishedCardContent';
import TransferProgressCardContent from './TransferProgressCardContent';

class UploadCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
			message: '',
			publicKey: '',
			formType: 'whisper',
		};
	}

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	handleClickNewUpload = () => {
		this.props.restartUploadForm();
	};

	changeForm = formType => {
		this.setState({ formType });
		console.log('changeForm: formType:', formType);
	};



	render() {
		const { classes, encryptAndAddFile, upload } = this.props;

		const { transferStatus, finishedTransfer } = upload;

		const { isFinished, isTransfering } = transferStatus;

		let renderedCardContent;

		if (isTransfering) {
			// Transfer Progress Indicator
			renderedCardContent = (
				<TransferProgressCardContent transferStatus={transferStatus} />
			);
		} else if (isFinished) {
			// Transfer Finished
			renderedCardContent = (
				<TransferFinishedCardContent
					handleClickNewUpload={this.handleClickNewUpload}
					publicKey={finishedTransfer.publicKey}
					burnerLink={finishedTransfer.burnerLink}
				/>
			);
		} else {
			// Transfer Uninitiated. Fill out form.
			renderedCardContent = (
				<Fragment>
					{/*  Upload Header  */}
					<UploadCardHeaderContainer />
					<Divider />
					{/*  Upload Form  */}
					<CardContent>
						<UploadForm
							encryptAndAddFile={encryptAndAddFile}
							formType={this.state.formType}
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
							<Collapse in={this.state.expanded} timeout="auto">
								<CardContent>
									<Divider />
									<RadioButtonForm changeForm={this.changeForm} />
									<Divider variant="middle" />
								</CardContent>
							</Collapse>
						</UploadForm>
					</CardContent>
				</Fragment>
			);
		}

		return <Card className={classes.card}>{renderedCardContent}</Card>;
	}
}

UploadCard.propTypes = {
	classes: PropTypes.object.isRequired,
	upload: PropTypes.object.isRequired,
};

export default UploadCard;
