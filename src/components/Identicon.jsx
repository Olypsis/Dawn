import React, { Fragment } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

class Identicon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seed: '0x1111111111111111111111111111111111111111',
		};
	}

	render() {
		const { publicKey } = this.props;
		const seed = publicKey
			? jsNumberForAddress(publicKey)
			: jsNumberForAddress(this.state.seed);
		console.log('SEED', seed);
		return (
			<Fragment>
				<Jazzicon diameter={25} seed={seed} />
			</Fragment>
		);
	}
}

export default Identicon;
