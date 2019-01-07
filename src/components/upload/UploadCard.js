import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class UploadCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            <IconButton>
              <HelpOutlineIcon />
            </IconButton>
          }
        />
        <CardContent>
          <h1>Upload File</h1>
          <Fab color="primary" aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
          <Divider />

          <TextField
            id="standard-with-placeholder"
            label="Send to"
            placeholder="0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            id="Message-Field"
            label="Message"
            multiline
            rows="4"
            className={classes.textField}
            margin="normal"
          />
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <MoreVertIcon />
          </IconButton>

          <Fab variant="extended" aria-label="Delete" className={classes.fab}>
            Transfer
          </Fab>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography>Email Link Example</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

UploadCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadCard);
