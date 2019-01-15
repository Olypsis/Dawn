// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { downloadAndDecryptFile } from '../download/actions';
import { toggleDrawer } from './actions';



// Core Component
import SidebarContextProvider from './SidebarContextProvider';

const mapStateToProps = state => ({
  whisper: state.whisper,
  events: state.events,
  sidebar: state.sidebar
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      downloadAndDecryptFile,
      toggleDrawer
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContextProvider);
