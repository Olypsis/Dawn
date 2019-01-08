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
const { httpProvider, enode } = config.whisper;
const { corsProxy } = config;
const mailserver = config.mailservers['mail-03.gc-us-central1-a.eth.beta'];
const channel = 'test999';

export const connectStatus = () => async (dispatch, getState) => {
  const status = new StatusJS();
  console.log('NEW STATUS', status);
  dispatch(newStatusInstanceAction(status));
  try {
    const { keyId, publicKey, userName } = await loginWithStatus(status);
    console.log(
      'Status KeyId:',
      keyId,
      'publicKey:',
      publicKey,
      'userName:',
      userName,
    );
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
      resolve({ keyId, publicKey, userName });
    } catch (err) {
      console.log(new Error(err));
      reject(err);
    }
  });

export const sendStatusMessage = (payload, publicKey) => async (
  dispatch,
  getState,
) => {
  const { status } = getState().whisper;
  console.log('sendStatusMessage: PAYLOAD SENT OVER STATUS:', payload);

  status.sendUserMessage(publicKey, payload, (err, res) => {
    console.log(res);
    dispatch(sendStatusMessageAction(payload));
  });
};

export const createStatusListener = () => async (dispatch, getState) => {
  const { status } = getState().whisper;

  // join public chat #FIXME: remove
  await status.joinChat(channel);

  // public message handler
  status.onMessage(channel, (err, data) => {
    if (data) console.log('Channel Message:', data.payload);
  });

  // private message handler
  status.onMessage((err, data) => {
    if (data) {
      const payload = JSON.parse(data.payload);
      // Dispatch Recieved Message Action
      // Payload [1][0] extrapolates the original JSON from the recieved status payload
      console.log(
        `Payload Received! Payload: ${JSON.stringify(payload[1][0])}`,
      );
      dispatch(receivedStatusMessageAction(payload[1][0]));
    }
  });
};

export const statusUseMailservers = () => async (dispatch, getState) => {
  // FIXME: Use mailservers
  const { status } = getState().whisper;
  const enode = mailserver;

  try {

    status.mailservers.useMailserver(enode, (err, res) => {
      console.log('statusUseMailservers: Using mailserver enode:', enode, res);

      // time window
      let from = parseInt(new Date().getTime() / 1000 - 86400, 10);
      let to = parseInt(new Date().getTime() / 1000, 10);

      status.mailservers.requestChannelMessages(
        channel,
        { from, to },
        (err, res) => {
          if (err) console.log(err);
          console.log('requestChannelMessages: res:', res);
        },
      );

      // User messages
      status.mailservers.requestUserMessages({ from, to }, (err, res) => {
        if (err) console.log(err);
        console.log('requestUserMessages: res:', res);
      });
      
    });
  } catch (err) {
    console.log(new Error(err));
  }
};

// Action Creators

const newStatusInstanceAction = statusInstance => ({
  type: NEW_STATUS_INSTANCE,
  payload: statusInstance,
});

export const statusConnectAction = (
  statusKeypairId,
  statusPublicKey,
  statusUsername,
) => ({
  type: STATUS_CONNECTED,
  payload: { statusKeypairId, statusPublicKey, statusUsername },
});

const sendStatusMessageAction = payload => ({
  type: SEND_WHISPER_MESSAGE,
  payload,
});

const receivedStatusMessageAction = payload => ({
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
