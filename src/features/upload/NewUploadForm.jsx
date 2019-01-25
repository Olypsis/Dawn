import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class UploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      publicKey: '',
      message: '',
      multiline: 'Controlled',
      currency: 'EUR',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  // Send a message
  sendMessage = (upload, sendStatusMessage) => async e => {
    e.preventDefault();
    const { ipfsAddedFile, encryptedFile } = upload;

    // Construct payload from IPFS and encrypted file data redux store
    const payload = {
      hash: ipfsAddedFile.fileHash,
      path: ipfsAddedFile.filePath,
      key: encryptedFile.decryptionKey,
      iv: encryptedFile.decryptionIv,
      note: this.state.message ? this.state.message : '',
    };

    if (payload.hash === '' || payload.path === '' || payload.iv === '') {
      return alert('Upload a file before sending through whisper!');
    }

    // this.props.sendMessage(payload, this.state.form.publicKey);
    return await sendStatusMessage(payload, this.state.publicKey);
  };

  render() {
    const { classes, children, upload, sendStatusMessage } = this.props;

    return (
      <form
        className={classes.container}
        onSubmit={e => this.sendMessage(upload, sendStatusMessage)(e)}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="public-key-textfield"
          label="Public Key"
          className={classes.textField}
          value={this.state.publicKey}
          onChange={this.handleChange('publicKey')}
          margin="normal"
        />
        <Divider />
        <TextField
          id="message-textfield"
          label="Message"
          className={classes.textField}
          value={this.state.message}
          onChange={this.handleChange('message')}
          margin="normal"
        />
        {children}
      </form>
    );
  }
}

UploadForm.propTypes = {
  classes: PropTypes.object.isRequired,
  upload: PropTypes.object.isRequired,
  sendStatusMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadForm);
