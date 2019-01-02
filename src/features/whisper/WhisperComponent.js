import React from 'react';
import PropTypes from 'prop-types';
import util from 'ethjs-util';

import {
  callWhisper,
  getWhisperInfo,
  shhextConfirmMessagesProcessed,
} from '../../util/whispercalls';

// Web3 whisper default provider
const wsProvider = 'ws://localhost:8546';
const httpProvider = 'http://104.197.46.74:8545';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const topic1 = '1234';
const topic2 = '5678';

class Whisper extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.doGetFilterMessages = this.doGetFilterMessages.bind(this);
    this.doRequestHistoricMessages = this.doRequestHistoricMessages.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // async onSubmitNewSubscription(e) {
  //   e.preventDefault();
  //   const topics = this.state.topics.split(',').map(t => t.trim().slice(0, 4));
  //   await this.createListener(topics);
  // }

  async doGetFilterMessages(e) {
    e.preventDefault();
    await this.props.getFilterMessages();
  }

  async doRequestHistoricMessages(e) {
    e.preventDefault();
    await this.props.requestHistoricMessages();
  }

  async componentDidMount() {

    // Set Whisper using default provider
    await this.props.setWhisper(null, proxyUrl + httpProvider);

    // Create a new Whisper Peer Identity
    await this.props.getWhisper();

    // Mark Trusted Enode
    await this.props.markTrustedEnode();

    // Create default message listener 
    await this.props.createListener();
  }


  render = () => (
    <div>
      <button onClick={this.doGetFilterMessages}> getFilterMessages </button>
      <button onClick={this.doRequestHistoricMessages}>
        requestHistoricMessages
      </button>
    </div>
  );
}

Whisper.propTypes = {
  whisper: PropTypes.object.isRequired,
};

export default Whisper;