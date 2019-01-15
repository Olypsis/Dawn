import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// SubComponents
import DrawerInnerMessageTable from './DrawerInnerTable';

// Material-UI
import { withStyles } from '@material-ui/core/styles';

// Context API
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
	drawerInnerContentHeader: {
		paddingLeft: theme.spacing.unit * 2,
	},
});

class DrawerInnerContainer extends Component {
	render() {
		const { classes } = this.props;
		return (
			<SidebarContext.Consumer>
				{context => (
					<Fragment>
						<h3 className={classes.drawerInnerContentHeader}>
							{context.sidebar.innerContentHeading}
						</h3>
						<DrawerInnerMessageTable />
					</Fragment>
				)}
			</SidebarContext.Consumer>
		);
	}
}

DrawerInnerContainer.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerInnerContainer);
