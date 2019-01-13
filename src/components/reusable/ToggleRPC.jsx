import { Component } from 'react';

export default class ToggleRPC extends Component {
	constructor(props) {
		super(props);
		this.state = {
			on: false,
		};
	}

	toggle = () => {
		this.setState({
			on: !this.state.on,
		});
	};

	render() {
		const { children } = this.props;
		return children({
			on: this.state.on,
			toggle: this.toggle,
		});
	}
}
