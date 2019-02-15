import React, { Component } from 'react';
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
		margin: 'inherit',
		display: 'flex',
		'flex-direction': 'row',
		'justify-content': 'flex-end',
	},
	tableAction: {
		'align-self': 'flex-end',
	},
});

class DrawerInnerMessageTable extends Component {

	handleRequestMessagesClick(requestMessages) {
		return async function(e) {
			try {
				await requestMessages();
			} catch (err) {
				alert('ERROR: Check console');
				console.log('handleRequestMessagesClick:', 
					err.message);
			}
		};
	}

	render() {
		const { classes, requestMessages } = this.props;

		return (
			<div className={classes.tableOptionsContainer}>
				<RefreshTooltip>
					<IconButton
						onClick={e => this.handleRequestMessagesClick(requestMessages)(e)}
						aria-label="Delete"
					>
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
