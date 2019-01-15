import React from 'react';
import PropTypes from 'prop-types';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

// Custom Button Component
import Button from '../buttons/DefaultButton';
import IdenticonButton from '../buttons/IdenticonButton';

// Custom Drawer Element
import Drawer from './Drawer';

// Context API
import SidebarContextProvider from '../../features/sidebar/SidebarParentContainer';
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
    float: 'right',
  },
  hide: {
    display: 'none',
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
            console.log('SidebarParent: context:', context);
            return (
              <div className={classes.root}>
                <CssBaseline />

                {/* About Modal Button */}
                <Button
                  onClick={this.handleAboutClick}
                  className={classes.menuButton}
                >
                  About
                </Button>

                {/* My Wallet Drawer Button */}
                <Button
                  onClick={(this.handleDrawerOpen, context.toggleDrawer)}
                  className={classes.menuButton}
                >
                  My Wallet
                </Button>

                {/* Identicon Button */}
                <IdenticonButton
                  onClick={() =>
                    this.handleDrawerToggleClick(context.toggleDrawer)
                  }
                />

                {/* Drawer Child Component */}
                <Drawer
                  open={context.sidebar.open}
                />
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
