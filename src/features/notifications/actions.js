	export const processQueue = () => (dispatch, getState) => {
		const { queue } = getState().notifications;
		if (queue.length > 0) {
			this.setState({
				messageInfo: this.queue.shift(),
				open: true,
			});
		}
	};

	export const openNotification = () => dispatch => {
		this.setState({ open: true });
	};


	export const closeNotification = (event, reason) => dispatch => {
		this.setState({ open: false });
	};


	handleClick = message => () => {
			this.queue.push({
				message,
				key: new Date().getTime(),
			});

			if (this.state.open) {
				// immediately begin dismissing current message
				// to start showing new one
				this.props.closeNotification();
			} else {
				this.processQueue();
			}
		};