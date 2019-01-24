import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

// SubComponents
import UploadForm from '../../components/forms/UploadForm';
import RadioButtonForm from '../../components/forms/RadioButtonForm';
import UploadCardHeaderContainer from './UploadCardHeaderContainer';


const styles = theme => ({
	card: {
		maxWidth: 400,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	actions: {
		display: 'flex',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	submitButton: {
		width: '100%',
		'text-align': 'center',
		display: 'block',
		background: '#1b65f6',
		color: '#ffffff',
	},
	uploadCardHeader: {
		width: '100%',
		padding: "10px 20px",
		'text-align': 'center',
		display: 'block',
		backgroundColor: "#f3f7ff",
		color: '#ffffff',
	},
});

class UploadCard extends React.Component {
	state = { expanded: false, message: '', publicKey: '' };

	handleExpandClick = () => {
		this.setState(state => ({ expanded: !state.expanded }));
	};

	render() {
		const { classes } = this.props;

		return (
			<Card className={classes.card}>
				{/*  Upload Header  */}
				<UploadCardHeaderContainer />

				<Divider />
				{/*  Upload Form  */}
				<CardContent>
					<UploadForm />
				</CardContent>

				{/* Expand Button + Options*/}
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
			</Card>
		);
	}
}

UploadCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadCard);
