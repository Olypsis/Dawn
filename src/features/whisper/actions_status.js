import Web3 from 'web3';
import util from 'ethjs-util';

import StatusJS from 'status-js-api';

import isEmpty from '../../util/is-empty';

// config
import config from '../../config';

import {
  GET_WHISPER,
  SEND_WHISPER_MESSAGE,
  CREATE_LISTENER,
  RECEIVED_MESSAGE,
  SET_WHISPER_PROVIDER,
  SET_WHISPER,
  CREATE_MESSAGE_FILTER,
  NEW_STATUS_INSTANCE,
  STATUS_CONNECTED,
} from '../../state/types';

// Whisper calls
import { getWhisperInfo, shhext_post } from '../../util/whispercalls';

// config variables
const { httpProvider } = config.whisper;
const { corsProxy } = config;
const mailserver = config.mailservers['mail-02.gc-us-central1-a.eth.beta'];

export const connectStatus = () => async (dispatch, getState) => {
  const status = new StatusJS();
  console.log('NEW STATUS', status);
  dispatch(newStatusInstanceAction(status));
  try {
    const {keyId, publicKey, userName} = await loginWithStatus(status);
    console.log("Status KeyId:", keyId, "publicKey:", publicKey, "userName:", userName)
    dispatch(statusConnectAction(keyId, publicKey, userName));
  } catch (err) {
    console.log(new Error(err));
  }
};

// Status Helper Function
// Can be used with any auth methods to generate your status keypair
export const loginWithStatus = (
  status,
  provider = httpProvider,
  privateKey = null,
) =>
  new Promise(async (resolve, reject) => {
    try {
      await status.connect(
        corsProxy + provider,
        privateKey,
      );
      const keyId = await status.getKeyId();
      const publicKey = await status.getPublicKey();
      const userName = await status.getUserName();
      resolve({keyId, publicKey, userName});
    } catch (err) {
      reject(err);
    }
  });

export const sendMessage = (opts, payload, shh) => dispatch => {
  console.log('PAYLOAD 0:', payload);

  // shh
  //   .post(opts)
  //   .then(h => {
  //     console.log(`Message with hash ${h} was successfuly sent`);
  //     console.log('PAYLOAD:', payload);
  //     dispatch(sendMessageAction(payload));
  //   })
  //   .catch(err => console.log('Error: ', err));

  shhext_post(opts);
};

export const createListener = (opts, shh) => async dispatch => {
  console.log('Creating Listener with opts:', opts);

  // Generate new identity
  const { topics, privateKeyID } = opts;

  // will receive also its own message send, below
  const subscription = await shh
    .subscribe('messages', {
      privateKeyID,
      topics,
    })
    .on('data', data => {
      const payload = JSON.parse(util.toAscii(data.payload));
      dispatch(receivedMessageAction(payload));
      console.log(`Hash Received! Hash: ${payload.hash}`);
      // this.notify(`Hash Received! Hash: ${payload.hash}`, 'info');
    });

  const newMessageFilter = await shh.newMessageFilter({
    privateKeyID,
    topics,
  });

  console.log('SUBSCRIPTION', subscription);
  console.log('MESSAGE FILTER', newMessageFilter);

  dispatch(createListenerAction(subscription));
  dispatch(createMessageFilterAction(newMessageFilter));

  // log
  console.log(
    'Created Listener! Listening for topics:',
    opts.topics.map(t => util.toAscii(t)),
  );
};

export const getFilterMessages = () => async (dispatch, getState) => {
  const { messageFilters, shh } = getState().whisper;
  const messages = await shh.getFilterMessages(messageFilters[0]);
  messages.map(msg => {
    console.log('GETFILTERMESSAGES', util.toAscii(msg.payload));
    const payload = JSON.parse(util.toAscii(msg.payload));
    dispatch(receivedMessageAction(payload));
  });
};

// Action Creators

const newStatusInstanceAction = statusInstance => ({
  type: NEW_STATUS_INSTANCE,
  payload: statusInstance,
});

const statusConnectAction = (statusKeypairId, statusPublicKey, statusUsername) => ({
  type: STATUS_CONNECTED,
  payload: {statusKeypairId, statusPublicKey, statusUsername}
});

const sendMessageAction = payload => ({
  type: SEND_WHISPER_MESSAGE,
  payload,
});

const receivedMessageAction = payload => ({
  type: RECEIVED_MESSAGE,
  payload,
});

const createListenerAction = subscription => ({
  type: CREATE_LISTENER,
  payload: subscription,
});

const createMessageFilterAction = messageFilter => ({
  type: CREATE_MESSAGE_FILTER,
  payload: messageFilter,
});

const setWhisperProviderAction = wsProvider => ({
  type: SET_WHISPER_PROVIDER,
  payload: wsProvider,
});

const setWhisperAction = shh => ({
  type: SET_WHISPER,
  payload: shh,
});

const getWhisperAction = whisper => ({
  type: GET_WHISPER,
  payload: whisper,
});
