import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Child Components
import Drawer from './Drawer';
import SidebarNav from "./SidebarNav";

// Context API
import SidebarContextProvider from '../../features/sidebar/SidebarParentContainer';
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
  root: {
    display: 'flex',
  },
});

class PersistentDrawerRight extends React.Component {
  handleDrawerToggleClick = toggleDrawer => {
    toggleDrawer();
  };

  handleAboutClick = () => {
    alert('About Modal');
  };

  render() {
    const { classes } = this.props;
    return (
      <SidebarContextProvider>
        <SidebarContext.Consumer>
          {context => {
            return (
              <div className={classes.root}>
                <CssBaseline />

                 {/* Top Level Navigation */}
                <SidebarNav />

                {/* Drawer Component */}
                <Drawer open={context.sidebar.open} />
              </div>
            );
          }}
        </SidebarContext.Consumer>
      </SidebarContextProvider>
    );
  }
}

PersistentDrawerRight.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerRight);
