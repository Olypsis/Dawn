// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { downloadAndDecryptFile } from '../download/actions';
import { toggleDrawer, openDrawer, closeDrawer } from './actions';
import { statusUseMailservers } from '../whisper/actions_status';




// Core Component
import SidebarContextProvider from './SidebarContextProvider';

const mapStateToProps = state => ({
  whisper: state.whisper,
  events: state.events,
  sidebar: state.sidebar,
  download: state.download,
  notifications: state.notifications
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      downloadAndDecryptFile,
      statusUseMailservers,
      toggleDrawer,
      openDrawer,
      closeDrawer
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContextProvider);
