import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

class FileOptionsMenu extends React.Component {
	state = {
		anchorEl: null,
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	// Click Handler for Download button for every payload received
	handleDownloadClick = async payload => {
		const { hash, path, key, iv } = payload;
		console.log("handleDownloadClick:", payload)
		this.handleClose();
		// await this.props.downloadAndDecryptFile(hash, path, key, iv);
	};

	render() {
		const { anchorEl } = this.state;
		const { payload, ...props } = this.props;
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
					<MenuItem onClick={() => this.handleDownloadClick(payload)}>
						Download
					</MenuItem>
				</Menu>
			</div>
		);
	}
}

FileOptionsMenu.propTypes = {
	
}
export default FileOptionsMenu;
