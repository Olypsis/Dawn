// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onFileUploaded, encryptAndAddFile } from './actions';

// Core Component
import NewUploadCardHeader from './NewUploadCardHeader';

// Material-ui
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  uploadCardHeader: {
    width: '100%',
    padding: '10px 20px',
    'text-align': 'center',
    display: 'block',
    backgroundColor: 'transparent',
    "text-color": "black"
  },
  uploadCardHeaderDisplayText: {
    "text-color": "black"
  }
});


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

  // console.log("NewUploadCardHeader:", NewUploadCardHeader)

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewUploadCardHeader));
