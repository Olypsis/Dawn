import React from 'react';
import PropTypes from 'prop-types';
import util from 'ethjs-util';

import {
  callWhisper,
  getWhisperInfo,
  shhextConfirmMessagesProcessed,
} from '../../util/whispercalls';

// Web3 whisper default provider
const wsProvider = 'ws://50.2.39.116:8546';
const httpProvider = 'http://104.197.46.74:8545';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const enode =
  // 'enode://36a800cb285d1b98c53c350e0560382662db31590640e17b493ad489409454d3c175bab112724ab28b4efc25921f86e45dcfb8eb84adc8cfdec912ebf6e8161c@104.197.46.74:30303';
// const enode =
//   'enode://015e22f6cd2b44c8a51bd7a23555e271e0759c7d7f52432719665a74966f2da456d28e154e836bee6092b4d686fe67e331655586c57b718be3997c1629d24167@35.226.21.19:30504';

const topic1 = '1234';
const topic2 = '5678';

class Whisper extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.doGetFilterMessages = this.doGetFilterMessages.bind(this);
    this.doRequestHistoricMessages = this.doRequestHistoricMessages.bind(this);
    this.doGetWhisperIdentityFromPassword = this.doGetWhisperIdentityFromPassword.bind(
      this,
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async doGetFilterMessages(e) {
    e.preventDefault();
    await this.props.getFilterMessages();
  }

  async doRequestHistoricMessages(e) {
    e.preventDefault();
    await this.props.requestHistoricMessages();
  }

  async componentDidMount() {
    // callWhisper();
    // getWhisperInfo();
    // shhextConfirmMessagesProcessed();
    await this.props.newStatus();
    await this.props.connectStatus();

    // Set Whisper using default provider
    await this.props.setWhisper(null, proxyUrl + httpProvider);
    // callWhisper()

    // Get web3.shh from props
    const { shh } = this.props.whisper;

    // Create a new Whisper Peer Identity
    await this.props.getWhisper(shh);

    // Set default values for component
    console.log('props.whisper: ', this.props.whisper);

    await this.props.markTrustedEnode();

    // Create default listener
    await this.props.createListener();
  }

  async doGetWhisperIdentityFromPassword(e) {
    e.preventDefault();
    await this.props.getWhisperIdentityFromPassword(
      '0x6fd68d061f8af918c9c7987e0ca82deed5e523316553532e52c79dcdee867269',
    );
    // TODO: Clear
    await this.props.createListener();
  }

  render = () => (
    <div>
      <button onClick={this.doGetFilterMessages}> getFilterMessages </button>
      <button onClick={this.doRequestHistoricMessages}>
        requestHistoricMessages
      </button>
      <button onClick={this.doGetWhisperIdentityFromPassword}>
        doGetWhisperIdentityFromPassword
      </button>
    </div>
  );
}

Whisper.propTypes = {
  hash: PropTypes.string,
  whisper: PropTypes.object.isRequired,
};

export default Whisper;
