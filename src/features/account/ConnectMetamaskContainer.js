// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { connectMetamask, signMetamaskLogin } from './actions';
import {
  createStatusListener,
  statusUseMailservers,
} from '../whisper/actions_status';

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
      createStatusListener,
      statusUseMailservers,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectMetamask);
