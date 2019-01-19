import React, { Component } from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';

// SubComponents
import UploadCardHeader from './UploadCardHeaderContainer';

class UploadCard extends Component {
  constructor(props) {
    super(props);


    this.initialState = {
      form: {
        files: [],
        uploadedFile: {},
        publicKey: '',
        topic: '1234',
        message: '',
      },

      errors: {
        publicKey: '',
        topic: '',
        message: '',
        file: '',
      },
    };
    this.state = this.initialState;



    this._onTextChange = this._onTextChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  // Send a message
  sendMessage = e => {
    e.preventDefault();
    const { ipfsAddedFile, encryptedFile } = this.props.upload;

    // Construct payload from IPFS and encrypted file data redux store
    const payload = {
      hash: ipfsAddedFile.fileHash,
      path: ipfsAddedFile.filePath,
      key: encryptedFile.decryptionKey,
      iv: encryptedFile.decryptionIv,
      note: this.state.form.message ? this.state.form.message : '',
    };

    if (payload.hash === '' || payload.path === '' || payload.iv === '') {
      return alert('Upload a file before sending through whisper!');
    }

    // this.props.sendMessage(payload, this.state.form.publicKey);
    this.props.sendStatusMessage(payload, this.state.form.publicKey);
  };

  _onTextChange(event) {
    let { form } = this.state;

    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    form[fieldName] = fieldValue;
    this.setState({ form });
  }

  async componentWillReceiveProps(nextProps) {
    // Set default values for component
    const { form } = this.state;
    form.topic = '1234';
    this.setState({ form });
  }

  render() {
    const { form, errors } = this.state;

    return (
      <div className={'app-card'}>
        {/* Top Card Content*/}
        <UploadCardHeader />

        {/* Bottom Card Content*/}
        <div className={'app-card-content'}>
          <div className={'app-card-content-inner'}>
            <form onSubmit={this.sendMessage}>
              <div className="app-form-item">
                <label htmlFor={'publicKey'}>Send to publicKey</label>
                <input
                  onChange={this._onTextChange}
                  value={form.publicKey}
                  name={'publicKey'}
                  placeholder={
                    _.get(errors, 'publicKey')
                      ? _.get(errors, 'publicKey')
                      : 'PUBKEY'
                  }
                  type={'text'}
                  id={'publicKey'}
                />
              </div>
              <div className={'app-form-item'}>
                <label htmlFor={'message'}>Message</label>
                <textarea
                  value={_.get(form, 'message', '')}
                  onChange={this._onTextChange}
                  placeholder={'Add a note (optional)'}
                  id={'message'}
                  name={'message'}
                />
              </div>

              <div className={'app-form-actions'}>
                <button type={'submit'} className={'app-button primary'}>
                  Send to Peer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UploadCard.propTypes = {
  sendStatusMessage: PropTypes.func.isRequired,
  upload: PropTypes.object.isRequired,
};

export default UploadCard;
