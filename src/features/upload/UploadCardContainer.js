// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendStatusMessage } from '../whisper/actions_status';
import {
  ipfsAddFile,
  encryptFile,
  onFileUploaded,
  encryptAndAddFile,
} from './actions';

// Core Component
import UploadCard from './UploadCardComponent';

const mapStateToProps = state => ({
  upload: state.upload,
  whisper: state.whisper,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendStatusMessage,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadCard);
