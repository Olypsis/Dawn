import React from 'react';

// Features
import UploadCard from '../../features/upload';
import Whisper from '../../features/whisper';
import NotificationsContainer from '../../features/notifications/NotificationsContainer';


// SubComponents
import SidebarParent from '../../components/sidebar/SidebarParent';
// import CustomSnackBars from '../../components/snackbars/MultipleSnackBars';


// import Toggle from '../../components/reusable/ToggleRPC';

// Material-UI
import { withStyles } from '@material-ui/core/styles';

// Logomark
import Logomark from '../../img/logomark.svg';

const styles = theme => ({
  Applogo: {
    animation: 'App-logo-spin infinite 20s linear',
    height: 100,
    margin: theme.spacing.unit * 2,
    marginLeft: 0,  
  },
});

class Homepage extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="main-container">
        <div className="flex-vertical">
          {/* Vertical Flex - for Header, Content */}
          <SidebarParent />
          <div className="flex-horizontal">
            {/* Horizontal Flex - for Transfer, Messages */}
            {/* Left Half of Page */}
            <div className="container transfer">
              <img src={Logomark} className={classes.Applogo} alt="logo" />
              <UploadCard />
            </div>

            {/* Right Half of Page */}
            <div className="container messages">
              <NotificationsContainer />
              <Whisper />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Homepage);
