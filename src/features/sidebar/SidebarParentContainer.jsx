// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { downloadAndDecryptFile } from '../download/actions';


// Core Component
import SidebarContextProvider from './SidebarContextProvider';

const mapStateToProps = state => ({
  whisper: state.whisper,
  events: state.events,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      downloadAndDecryptFile,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
)(SidebarContextProvider);
