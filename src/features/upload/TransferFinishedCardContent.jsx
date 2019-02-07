import React, { Component } from 'react';

// Material-UI
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';


export default class TransferProgressCardContent extends Component {
	render() {

		return (
			<Fragment>
				<CardContent>
					<h1>You're Finished!</h1>
				</CardContent>
				<Divider />
				<CardContent>
					<button onClick={handleClickNewUpload}> Upload a New File </button>
				</CardContent>
			</Fragment>
		);
	}
}
