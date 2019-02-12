// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { downloadAndDecryptFile } from '../download/actions';
import { toggleDrawer, openDrawer, closeDrawer } from './actions';



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
