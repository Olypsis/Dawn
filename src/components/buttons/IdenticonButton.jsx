import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Components
import Toggle from '../reusable/ToggleRPC';
import Identicon from '../Identicon';

// Material-UI
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
    'z-index': 3000,
    position: 'fixed-right',
    border: "2px solid white"
  },
  input: {
    display: 'none',
  },
});

function ContainedButton(props) {
  const { classes, onClick } = props;
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
              <Identicon />
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
