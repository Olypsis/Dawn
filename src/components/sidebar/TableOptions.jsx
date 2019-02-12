import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// SubComponents
import { RefreshTooltip } from '../tooltips/Tooltips';
// import IndeterminateSpinner from '../spinners/IndeterminateSpinner';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import AutoRenewIcon from '@material-ui/icons/AutorenewSharp';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
	tableOptionsContainer: {
		margin: "inherit",
		display: 'flex',
		"flex-direction": "row",
		"justify-content": "flex-end"
	},
	tableAction: {
		"align-self": "flex-end"
	}
});

class DrawerInnerMessageTable extends Component {
	render() {
		const { classes, ...props } = this.props;

		return (
			<div className={classes.tableOptionsContainer}>
				<RefreshTooltip>
					<IconButton aria-label="Delete">
						<AutoRenewIcon />
					</IconButton>
				</RefreshTooltip>
			</div>
		);
	}
}

DrawerInnerMessageTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerInnerMessageTable);
