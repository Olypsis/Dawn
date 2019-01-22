import React, { Fragment } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

// Redux
import { connect } from 'react-redux';

class Identicon extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			seed: '0x1111111111111111111111111111111111111111',
		};
	}

	render() {
		const { publicKey } = this.props.whisper.statusDetails;
		const seed = publicKey
			? jsNumberForAddress(publicKey)
			: jsNumberForAddress(this.state.seed);
		console.log('SEED', seed);
		return (
			<Fragment>
				<Jazzicon diameter={30} seed={seed} />
			</Fragment>
		);
	}
}

const mapStateToProps = state => ({
  whisper: state.whisper,
});

export default connect(
  mapStateToProps,
)(Identicon);

