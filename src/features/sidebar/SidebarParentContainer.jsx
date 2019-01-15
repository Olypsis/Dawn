// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Core Component
import SidebarContextProvider from './SidebarContextProvider';

const mapStateToProps = state => ({
  whisper: state.whisper,
  events: state.events,
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       connectMetamask,
//       signMetamaskLogin,
//       createStatusListener,
//       statusUseMailservers,
//     },
//     dispatch,
//   );

export default connect(
  mapStateToProps,
)(SidebarContextProvider);
