import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import Toggle from '../reusable/ToggleRPC';

// Material-UI
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

// Context API
import { SidebarContext } from '../../features/sidebar/SidebarContext';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
    'z-index': 10,
  },
  input: {
    display: 'none',
  },
});

function ToggleDrawerButton(props) {
  const { classes, onClick, children } = props;

  this.onClickToggleDrawer(toggleDrawer) {

  }


  return (
    <div>
      <Toggle>
        {({ on, toggle }) => (
          <Fragment>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={onClick}
              className={classNames(classes.button)}
            >
              {children}
            </IconButton>
          </Fragment>
        )}
      </Toggle>
    </div>
  );
}

ContainedButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButton);
