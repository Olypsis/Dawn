import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// SubComponents
import FileOptionsMenu from '../menus/FileOptionsMenu';
import TableOptions from './TableOptions';
import IndeterminateSpinner from '../spinners/IndeterminateSpinner';

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

// Utils
import isEmpty from '../../util/is-empty';

const styles = theme => ({
	drawerInnerContentHeader: {
		paddingLeft: theme.spacing.unit * 2,
	},
	drawerInnerTable: {
		margin: theme.spacing.unit * 2,
		paddingLeft: theme.spacing.unit * 2,
	},
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		width: '100%',
	},
	spinner: {
		width: '100%',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	typography: {
		margin: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 2,
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
					// let renderedDownloadSpinner = context.download.isDownloading ? (
					// 	<IndeterminateSpinner className={classes.spinner} />
					// ) : null;
					let renderedTableBody;

					if (!isEmpty(context.events.received_messages)) {
						const rows = context.events.received_messages.map(payload => {
							// TODO: rename to events.all
							return createData(
								payload.path,
								null,
								null,
								payload.note,
								payload,
							);
						});
						renderedTableBody = rows.map(row => {
							return (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										<Typography component="p" variant="p" noWrap={true}>
											{row.name}
										</Typography>
									</TableCell>
									<TableCell align="left">
										<Typography component="p" variant="p" noWrap={true}>
											{row.message}
										</Typography>
									</TableCell>
									<TableCell align="left">
										<FileOptionsMenu payload={row.payload} />
									</TableCell>
								</TableRow>
							);
						});
					} else if (context.whisper.isRequestingMessages) {
						renderedTableBody = (
							<TableRow className={classes.drawerInnerTable}>
								<IndeterminateSpinner className={classes.spinner} />
								<Typography component="p" variant="p">
									Requesting...
								</Typography>
							</TableRow>
						);
					} else {
						renderedTableBody = (
							<TableRow className={classes.drawerInnerTable}>
								<Typography component="p" variant="p">
									No files yet...
								</Typography>
								<br />
								<Typography component="p" variant="p">
									{' '}
									Try logging in with metamask, or requesting messages!{' '}
								</Typography>
							</TableRow>
						);
					}

					return (
						<Fragment>
							<h3 className={classes.drawerInnerContentHeader}>Your Files</h3>
							<TableOptions requestMessages={context.statusUseMailservers}/>
							<Paper className={classes.root}>
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell align="left">Name</TableCell>
											<TableCell align="left">Message</TableCell>
											<TableCell align="left">Options</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>{renderedTableBody}</TableBody>
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
