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
      formType: '',
      randomPublicKey: '',
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

  formChanged = async formType => {
    if (formType === 'link') {
      // 1. Create burner account
      const {
        // newKeyPairId,
        newPubKey,
        // burnerpKey,
        // burnerLink,
      } = await this.props.generateLink();
      // 2. Set Public key to form
      console.log('Burner pubkey', newPubKey);
      this.setState({ publicKey: newPubKey, formType: 'link' });
    } else {
      console.log('Form is link', formType);
    }
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.formChanged(nextProps.formType);
  }
  render() {
    const { classes, children, upload, sendStatusMessage } = this.props;

    let renderFormLink;
    if (this.state.formType === 'link') {
      renderFormLink = (
        <TextField
          disabled
          id="public-key-textfield"
          label="Public Key"
          className={classes.textField}
          value={this.state.publicKey}
          margin="normal"
        />
      );
    } else {
      renderFormLink = (
        <TextField
          id="public-key-textfield"
          label="Public Key"
          className={classes.textField}
          value={this.state.publicKey}
          onChange={this.handleChange('publicKey')}
          margin="normal"
        />
      );
    }
    return (
      <form
        className={classes.container}
        onSubmit={e => this.sendMessage(upload, sendStatusMessage)(e)}
        noValidate
        autoComplete="off"
      >
        {renderFormLink}
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
