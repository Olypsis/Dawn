import React, { createContext } from 'react';
import PropTypes from 'prop-types';

// Material-UI
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';

// Custom Button Component
import Button from '../buttons/DefaultButton';

// Custom Drawer Element
import Drawer from './Drawer';

// Context Provider for passing props throught the Sidebar
import SidebarContextProvider from '../../features/sidebar/SidebarParentContainer';

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
  state = {
    open: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: !this.state.open });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, events, whisper } = this.props;
    const { open } = this.state;
    return (
      <SidebarContextProvider>
        <div className={classes.root}>
          <CssBaseline />
          <Button
            onClick={this.handleDrawerOpen}
            className={classes.menuButton}
          >
            <MenuIcon />
          </Button>
          {/* Drawer */}
          <Drawer open={open} handleDrawerOpen={this.handleDrawerOpen} />
          {/* End Drawer */}
        </div>
      </SidebarContextProvider>
    );
  }
}

PersistentDrawerRight.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerRight);
