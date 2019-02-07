import React, { Component, Fragment } from 'react';

// Material-UI
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export default class TransferProgressCardContent extends Component {
	render() {
		const { handleClickNewUpload, publicKey, burnerLink } = this.props;

		const renderedURLContent = !burnerLink ? null : (
			<Fragment>
				<p> Share this URL: </p>
				<a href={burnerLink}> {burnerLink} </a>
			</Fragment>
			);

		return (
			<Fragment>
				<CardContent>
					<CheckCircleIcon />
					<h1>You're Finished!</h1>
					<p> Sent to Public Key: </p>
					<p> {publicKey} </p>
					{renderedURLContent}
				</CardContent>
				<Divider />
				<CardContent>
					<button
						onClick={handleClickNewUpload}
						className={'app-button primary'}
					>
						{' '}
						Upload a New File{' '}
					</button>
				</CardContent>
			</Fragment>
		);
	}
}
