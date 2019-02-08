import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import ContentCopy from '@material-ui/icons/FileCopy';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
	cardContent: {
		height: 300,
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
	},
	finishedHeader: {
		'text-align': 'center',
	},
	finishedIcon: {
		'text-align': 'center',
		'margin-left': 'auto',
		'margin-right': 'auto',
		width: '100%',
		'margin-top': '20%',
		'margin-bottom': '5%',
		'font-size': 30,
		color: 'skyblue',
	},
	button: {
		margin: theme.spacing.unit,
	},
	newUploadButton: {
		margin: theme.spacing.unit / 2,
		'margin-left': 'auto',
		'margin-right': 'auto',
		width: '100%',
	},
});


class TransferFinishedCardContent extends Component {
	state = {
		burnerLinkCopied: false,
	};

	render() {
		const { handleClickNewUpload, publicKey, burnerLink, classes } = this.props;
		// const { burnerLinkCopied } = this.state;
		// If URL, display URL
		const renderedURLContent = !burnerLink ? null : (
			<Fragment>
				<Grid container spacing={12}>
					<Grid item xs={9}>
						<Paper className={classes.root} elevation={0}>
							<Typography variant="h5" component="h3">
								Share this URL:
							</Typography>
							<Typography component="p" noWrap>
								{burnerLink}
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={3}>
						<CopyToClipboard
							text={burnerLink}
							onCopy={() => this.setState({ burnerLinkCopied: true })}
						>
							<IconButton aria-label="Copy" className={classes.button}>
								<ContentCopy />
							</IconButton>
						</CopyToClipboard>
					</Grid>
				</Grid>
			</Fragment>
		);

		return (
			<Fragment>
				<CardContent>
					<CheckCircleIcon className={classes.finishedIcon} />
					<Typography
						variant="h2"
						component="h2"
						className={classes.finishedHeader}
					>
						Finished!
					</Typography>
					<Paper className={classes.root} elevation={0}>
						<Typography variant="h5" component="h3">
							Sent to Public Key:
						</Typography>
						<Typography component="p" noWrap>
							{publicKey}
						</Typography>
					</Paper>
					{renderedURLContent}
				</CardContent>
				<Divider />
				<CardContent>
					<Button
						onClick={handleClickNewUpload}
						variant="contained"
						className={classes.newUploadButton}
					>
						Send a New File
					</Button>
				</CardContent>
			</Fragment>
		);
	}
}

TransferFinishedCardContent.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TransferFinishedCardContent);
