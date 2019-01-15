import React, { Component } from 'react';
import PropTypes from 'prop-types';

// SubComponents
import SimpleMenu from '../menus/SimpleMenu';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(name, calories, fat, carbs, protein) {
	id += 1;
	return { id, name, calories, fat, carbs, protein };
}

const rows = [
	createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
	createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
	createData('Eclair', 262, 16.0, 24, 6.0),
	createData('Cupcake', 305, 3.7, 67, 4.3),
	createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class DrawerInnerMessageTable extends Component {
	handleClick() {
		alert('Clicked!');
	}

	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell align="left">Name</TableCell>
							<TableCell align="left">Sender</TableCell>
							<TableCell align="left">Size</TableCell>
							<TableCell align="left">Options</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map(row => {
							return (
								<TableRow key={row.id}>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="left">
										{row.calories}
									</TableCell>
									<TableCell align="left">
										{row.fat}
									</TableCell>
									<TableCell align="left">
										<SimpleMenu />
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

DrawerInnerMessageTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DrawerInnerMessageTable);
