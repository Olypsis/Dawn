import axios from 'axios';
import {
  GET_WHISPER,
  SEND_WHISPER_MESSAGE,
  CREATE_LISTENER,
  RECEIVED_MESSAGE,
  SET_WHISPER_PROVIDER,
  SET_WHISPER
} from './types';

import Web3 from 'web3';
import util from 'ethjs-util';

export const setWhisper = wsProvider => async dispatch => {
  dispatch(setWhisperProviderAction(wsProvider));
  let web3 = new Web3(new Web3.providers.WebsocketProvider(wsProvider));
  let shh = web3.shh;
  dispatch(setWhisperAction(shh));
};

export const getWhisper = shh => async dispatch => {
  console.log('Shh Current Provider', shh.currentProvider);
  console.log('Shh Given Provider:', shh.givenProvider);

  // Get node info
  const info = await shh.getInfo();
  const isListening = await shh.net.isListening();
  const peerCount = await shh.net.getPeerCount();
  const netId = await shh.net.getId();

  // Get Identity
  const keyPairId = await shh.newKeyPair();
  const symKeyId = await shh.newSymKey();
  const publicKey = await shh.getPublicKey(keyPairId);
  const privateKey = await shh.getPrivateKey(keyPairId);
  const whisper = {
    info,
    isListening,
    peerCount,
    netId,
    keyPairId,
    symKeyId,
    publicKey,
    privateKey
  };
  return dispatch(getWhisperAction(whisper));
};

export const sendMessage = (opts, shh) => dispatch => {
  shh
    .post(opts)
    .then(h => {
      console.log(`Message with hash ${h} was successfuly sent`);
      dispatch(sendMessageAction(h));
    })
    .catch(err => console.log('Error: ', err));
};

export const createListener = (opts, shh) => dispatch => {
  // Generate new identity
  const topics = opts.topics;
  // will receive also its own message send, below
  const subscription = shh
    .subscribe('messages', {
      // symKeyID: this.state.whisper.symKeyId, //symKeyId
      privateKeyID: opts.privateKeyID,
      topics
    })
    .on('data', data => {
      const payload = JSON.parse(util.toAscii(data.payload));
      dispatch(receivedMessageAction(payload));
      console.log(`Hash Received! Hash: ${payload.hash}`);
      // this.notify(`Hash Received! Hash: ${payload.hash}`, 'info');
    });
  dispatch(createListenerAction(subscription));
  // log
  console.log(
    'Created Listener! Listening for topics:',
    opts.topics.map(t => {
      return util.toAscii(t);
    })
  );
};

const sendMessageAction = hash => {
  return {
    type: SEND_WHISPER_MESSAGE,
    payload: hash
  };
};

const receivedMessageAction = payload => {
  return {
    type: RECEIVED_MESSAGE,
    payload
  };
};

const createListenerAction = subscription => {
  return {
    type: CREATE_LISTENER,
    payload: subscription
  };
};

const setWhisperProviderAction = wsProvider => {
  return {
    type: SET_WHISPER_PROVIDER,
    payload: wsProvider
  };
};

const setWhisperAction = shh => {
  return {
    type: SET_WHISPER,
    payload: shh
  };
};

const getWhisperAction = whisper => {
  return {
    type: GET_WHISPER,
    payload: whisper
  };
};
