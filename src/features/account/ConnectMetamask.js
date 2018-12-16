import React from 'react';
import PropTypes from 'prop-types';

import { Web3Provider } from 'react-web3';

class ConnectMetamask extends React.Component {
	constructor(props) {
		super(props);
		this.onClickSignButton = this.onClickSignButton.bind(this);
	}

	async onClickSignButton(e) {
		e.preventDefault();
		console.log('You clicked the Sign Button! LOL!');
		try {
			await this.props.signMetamaskLogin();
			await this.props.createListener();
		} catch (err) {
			alert('err.message');
		}
	}

	render() {
		return (
			<div className="flex-vertical">
				<h3>Login with Metamask</h3>
				<button onClick={this.onClickSignButton}>
					Login With Metamask
				</button>
			</div>
		);
	}
}

export default ConnectMetamask;
