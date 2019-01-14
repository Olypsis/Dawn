import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import Toggle from '../reusable/ToggleRPC';
import Identicon from '../Identicon';

// Material-UI
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
	},
});

function ContainedButton(props) {
	const { classes, onClick, color } = props;
	console.log("ContainedButton: classes:", classes)
	return (
		<Button
			onClick={onClick}
			color={color}
			className={classes.button}
		>
			Your shit
		</Button>
	);
}

ContainedButton.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButton);
