import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Material-UI
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	button: {
		margin: theme.spacing.unit,
		marginTop: 20,
	},
});

class TableFilters extends Component {

	state = {
		recieved: true,
		
	}

	handleFilterButtonClick(e, filter) {
		this.props.history.push({
			pathname: '/messages',
			search: `?filter=${filter}`,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		// only update chart if the data has changed
		if (prevProps.data !== this.props.data) {
			this.chart = c3.load({
				data: this.props.data,
			});
		}
	}

	render() {
		const { classes, location } = this.props;

		const params = new URLSearchParams(location.search);
		const filter = params.get('filter');

		return (
			<div>
				<Button
					className={classes.button}
					onClick={e => this.handleFilterButtonClick(e, 'received')}
				>
					Received{' '}
				</Button>
				<Button
					className={classes.button}
					onClick={e => this.handleFilterButtonClick(e, 'sent')}
				>
					Sent{' '}
				</Button>
				<Button
					className={classes.button}
					onClick={e => this.handleFilterButtonClick(e, 'all')}
				>
					All{' '}
				</Button>
			</div>
		);
	}
}

export default withRouter(withStyles(styles)(TableFilters));
