// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendStatusMessage } from '../whisper/actions_status';
import { encryptAndAddFile } from './actions';

// Core Component
import NewUploadCard from './NewUploadCard';

// Material-ui
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';

// Styles for NewUploadCard defined here, so they can be passed in
const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  submitButton: {
    width: '100%',
    'text-align': 'center',
    display: 'block',
    background: '#1b65f6',
    color: '#ffffff',
  },
  uploadCardHeader: {
    width: '100%',
    padding: '10px 20px',
    'text-align': 'center',
    display: 'block',
    backgroundColor: '#f3f7ff',
    color: '#ffffff',
  },
});

const mapStateToProps = state => ({
  upload: state.upload,
  whisper: state.whisper,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendStatusMessage,
      encryptAndAddFile,
    },
    dispatch,
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NewUploadCard),
);
