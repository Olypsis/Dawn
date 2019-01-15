import React, { Component } from 'react';
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

// Context API
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
	drawerInnerTable: {
		paddingLeft: theme.spacing.unit * 2,
	},
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
});

let id = 0;

function createData(name, sender, size, message, payload) {
	id += 1;
	return { id, name, sender, size, message, payload };
}

class DrawerInnerMessageTable extends Component {
	render() {
		const { classes } = this.props;
		return (
			<SidebarContext.Consumer>
				{context => {
					const rows = context.events.events.map(event => {
						// TODO: rename to events.all
						// get payload from message
						const { payload } = event;
						return createData(
							payload.path,
							null,
							null,
							payload.note,
							payload,
						);
					});

					return (
						<Paper className={classes.root}>
							<Table className={classes.table}>
								<TableHead>
									<TableRow>
										<TableCell align="left">Name</TableCell>
										<TableCell align="left">
											Sender
										</TableCell>
										<TableCell align="left">Size</TableCell>
										<TableCell align="left">
											Message
										</TableCell>
										<TableCell align="left">
											Options
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{rows.map(row => {
										return (
											<TableRow key={row.id}>
												<TableCell
													component="th"
													scope="row"
												>
													{row.name}
												</TableCell>
												<TableCell align="left">
													{row.sender}
												</TableCell>
												<TableCell align="left">
													{row.size}
												</TableCell>
												<TableCell align="left">
													{row.message}
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
