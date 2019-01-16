import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    marginTop: 20
  },
  input: {
    display: 'none',
  },
});

function ContainedButtons(props) {
  const { classes, onClick, children, component } = props;
  console.log('ContainedButtons: component:', component);
  return (
    <div>
      <Button variant="contained" className={classes.button} onClick={onClick} component={component}>
        {children}
      </Button>
    </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);
