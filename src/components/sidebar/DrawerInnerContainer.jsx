import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// SubComponents
import DrawerInnerMessageTable from "./DrawerInnerTable";

// Material-UI
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	drawerInnerContentHeader: {
		paddingLeft: theme.spacing.unit * 2,
	},
});

class DrawerInnerContainer extends Component {
	render() {
		const { classes, heading } = this.props;
		return (
			<Fragment>
				<h3 className={classes.drawerInnerContentHeader}>{heading}</h3>
				<DrawerInnerMessageTable />
			</Fragment>
		);
	}
}

DrawerInnerContainer.propTypes = {
	classes: PropTypes.object.isRequired,
	heading: PropTypes.string.isRequired
}



export default withStyles(styles)(DrawerInnerContainer);
