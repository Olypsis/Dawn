// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connectStatus, createStatusListener } from './actions_status';

// Core Component
import Whisper from './WhisperComponent';

const mapStateToProps = state => ({
  whisper: state.whisper,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // Status
      connectStatus,
      createStatusListener,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Whisper);
