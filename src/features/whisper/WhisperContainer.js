// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getWhisper,
  sendMessage,
  createListener,
  setWhisper,
  getFilterMessages,
  requestHistoricMessages,
  getWhisperIdentityFromPassword,
  markTrustedEnode
} from './actions';
import { connectStatus } from './actions_status';

// Core Component
import Whisper from './WhisperComponent';

const mapStateToProps = state => ({
  whisper: state.whisper,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getWhisper,
      setWhisper,
      sendMessage,
      createListener,
      getFilterMessages,
      requestHistoricMessages,
      getWhisperIdentityFromPassword,
      markTrustedEnode,
      // Status
      connectStatus,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Whisper);
