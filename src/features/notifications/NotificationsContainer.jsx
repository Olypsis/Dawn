// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  processQueue,
  openNotification,
  closeNotification,
  pushNotificationToQueue,
} from './actions';

// Core Component
import MultipleNotificationsComponent from './MultipleNotificationsComponent';

const mapStateToProps = state => ({
  notifications: state.notifications,
  events: state.events,
  sidebar: state.sidebar,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      processQueue,
      openNotification,
      closeNotification,
      pushNotificationToQueue,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MultipleNotificationsComponent);
