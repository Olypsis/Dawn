import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		marginTop: 20,
	},
	input: {
		display: 'none',
	},
	margin: {
		margin: theme.spacing.unit * 2,
	},
	padding: {
		padding: `0 ${theme.spacing.unit * 2}px`,
	},
});

function BadgedButton(props) {
	const { classes, onClick, children, component, badgeNum } = props;
	// console.log('DefaultButton: component:', component);
	const renderedButton =
		(badgeNum === 0) ? (
			<Button variant="contained" onClick={onClick} component={component}>
				{children}
			</Button>
		) : (
			<Badge color="secondary" badgeContent={badgeNum}>
				<Button variant="contained" onClick={onClick} component={component}>
					{children}
				</Button>
			</Badge>
		);
	return <div className={classes.button}>{renderedButton}</div>;
}

BadgedButton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BadgedButton);
