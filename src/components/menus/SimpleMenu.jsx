import React from 'react';

// Material-UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

class SimpleMenu extends React.Component {
	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { anchorEl } = this.state;

		return (
			<div>
				<IconButton
					aria-label="More"
					aria-haspopup="true"
					onClick={this.handleClick}
				>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					open={Boolean(anchorEl)}
					onClose={this.handleClose}
				>
					<MenuItem onClick={this.handleClose}>Profile</MenuItem>
					<MenuItem onClick={this.handleClose}>My account</MenuItem>
					<MenuItem onClick={this.handleClose}>Logout</MenuItem>
				</Menu>
			</div>
		);
	}
}

export default SimpleMenu;
