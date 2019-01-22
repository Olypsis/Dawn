import React, { Component } from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

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
			age: '',
			multiline: 'Controlled',
			currency: 'EUR',
		};
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	render() {
		const { classes } = this.props;

		return (
			<form className={classes.container} noValidate autoComplete="off">
				<TextField
					id="public-key-textfield"
					label="Public Key"
					className={classes.textField}
					value={this.state.publicKey}
					onChange={this.handleChange('publicKey')}
					margin="normal"
				/>
			</form>
		);
	}
}

UploadForm.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadForm);
