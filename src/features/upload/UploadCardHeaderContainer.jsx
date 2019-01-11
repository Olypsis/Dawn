// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onFileUploaded, encryptAndAddFile } from './actions';

// Core Component
import UploadCardHeader from './UploadCardHeaderComponent';

const mapStateToProps = state => ({
  upload: state.upload,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      encryptAndAddFile,
      onFileUploaded,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UploadCardHeader);
