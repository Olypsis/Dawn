// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { connectMetamask, signMetamaskLogin } from './actions';
import { createListener } from '../whisper/actions';

// Core Component
import ConnectMetamask from './ConnectMetamask';

const mapStateToProps = state => ({
	events: state.events,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			connectMetamask,
			signMetamaskLogin,
		},
		dispatch,
	);

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(ConnectMetamask);
