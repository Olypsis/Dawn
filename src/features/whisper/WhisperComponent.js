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
    // await this.props.newStatus();
    await this.props.connectStatus();
    await this.props.createStatusListener();


    // // Set Whisper using default provider
    // await this.props.setWhisper(null, proxyUrl + httpProvider);
    // // callWhisper()

    // // Get web3.shh from props
    // const { shh } = this.props.whisper;

    // // Create a new Whisper Peer Identity
    // await this.props.getWhisper(shh);

    // // Set default values for component
    // console.log('props.whisper: ', this.props.whisper);

    // await this.props.markTrustedEnode();

    // // Create default listener
    // await this.props.createListener();
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
