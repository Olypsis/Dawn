// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import { enqueueSnackbar, removeSnackbar } from './actions';

// Core Component
import NotistackComponent from './NotistackComponent';

const mapStateToProps = state => ({
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      enqueueSnackbar,
      removeSnackbar
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSnackbar(NotistackComponent));
