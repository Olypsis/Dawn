import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// SubComponents
import FileOptionsMenu from '../menus/FileOptionsMenu';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


// Context API
import { SidebarContext } from '../../features/sidebar/SidebarContext';

// Redux
import { _clearMessageCounter } from '../../features/notifications/actions';

const styles = theme => ({
	drawerInnerContentHeader: {
		paddingLeft: theme.spacing.unit * 2,
	},
	drawerInnerTable: {
		paddingLeft: theme.spacing.unit * 2,
	},
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		width: "100%",
	},
});

let id = 0;

function createData(name, sender, size, message, payload) {
	id += 1;
	return { id, name, sender, size, message, payload };
}

class DrawerInnerMessageTable extends Component {
	componentDidMount() {
		_clearMessageCounter();
	}

	render() {
		const { classes } = this.props;
		return (
			<SidebarContext.Consumer>
				{context => {
					const rows = context.events.received_messages.map(payload => {
						// TODO: rename to events.all
						return createData(payload.path, null, null, payload.note, payload);
					});

					return (
						<Fragment>
							<h3 className={classes.drawerInnerContentHeader}>Your Files</h3>
							<Paper className={classes.root}>
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell align="left">
											<Typography component="p" noWrap>
												Name
											</Typography>
											</TableCell>
											<TableCell align="left">
											<Typography component="p" noWrap>
												Message
											</Typography>
											</TableCell>
											<TableCell align="left">
											<Typography component="p" noWrap>
												Options
											</Typography>
											</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{rows.map(row => {
											return (
												<TableRow key={row.id}>
													<TableCell component="th" scope="row">
													<Typography component="p" noWrap>
														{row.name}
													</Typography>
													</TableCell>
													<TableCell align="left">
													<Typography component="p" noWrap>
														{row.message}
													</Typography>
													</TableCell>
													<TableCell align="left">
														<FileOptionsMenu payload={row.payload} />
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							</Paper>
						</Fragment>
					);
				}}
			</SidebarContext.Consumer>
		);
	}
}

DrawerInnerMessageTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerInnerMessageTable);
