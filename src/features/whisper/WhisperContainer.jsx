// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connectStatus, createStatusListener, statusUseMailservers } from './actions_status';

// Core Component
import Whisper from './WhisperComponent';

const mapStateToProps = state => ({
  whisper: state.whisper,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      connectStatus,
      createStatusListener,
      statusUseMailservers
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Whisper);
