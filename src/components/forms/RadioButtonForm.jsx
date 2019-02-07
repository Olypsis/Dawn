import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 2,
  },
  group: {
    margin: theme.spacing.unit,
    "flex-direction": "row"
  },
  expandSectionHeader: {
    marginTop: theme.spacing.unit * 1,
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: 'whisper',
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
    console.log(
      'RadioButtonsGroup: handleChange: event.target.value: ',
      event.target.value,
    );
    this.props.changeForm(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend" className={classes.expandSectionHeader}>
            Send As
          </FormLabel>
          <RadioGroup
            aria-label="p2p-messaging-option"
            name="p2p-messaging-option"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="whisper"
              control={<Radio color="primary" />}
              label="whisper"
              labelPlacement="start"
            />
            <FormControlLabel
              value="link"
              control={<Radio color="primary" />}
              label="link"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioButtonsGroup);
