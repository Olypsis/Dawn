// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  ipfsAddFile,
  encryptFile,
  onFileUploaded,
  encryptAndAddFile,
} from './actions';
import { sendMessage } from '../whisper/actions';
import { sendStatusMessage } from '../whisper/actions_status';


// Core Component
import UploadCard from './UploadCardComponent';

const mapStateToProps = state => ({
  upload: state.upload,
  whisper: state.whisper,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendMessage,
      sendStatusMessage
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadCard);
