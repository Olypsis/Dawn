import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
	button: {
		margin: theme.spacing.unit * 4,
		'background-color': '#F69131',
		color: "white",
		"font-size": "10px",
		width: '50%',
		height: '7vh',
		marginLeft: 'auto',
		marginRight: 'auto',
		// marginLeft: theme.spacing.unit * 4,
		// marginRight: theme.spacing.unit * 4,
		// marginTop: theme.spacing.unit * 4,
		// marginBottom: theme.spacing.unit * 4 ,
	},
	input: {
		display: 'none',
	},
});

function ContainedButtons({ classes, onClick, children }) {
	return (
		<Fragment>
			<Button
				variant="contained"
				className={classes.button}
				onClick={onClick}
			>
				<Typography component="p">
					Login With Metamask
				</Typography>
			</Button>
		</Fragment>
	);
}

ContainedButtons.propTypes = {
	classes: PropTypes.object.isRequired,
	onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(ContainedButtons);
