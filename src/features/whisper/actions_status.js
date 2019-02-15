import StatusJS from 'status-js-api';
import config from '../../config';

import store from '../../state/store';
import {
  NEW_STATUS_INSTANCE,
  STATUS_CONNECTED,
  SEND_WHISPER_MESSAGE,
  RECEIVED_MESSAGE,
} from '../../state/types';

import {
  _enqueueSnackbar,
  _incrementNewMessageCounter,
} from '../notifications/actions';


// Utils
import forceMailserverQuery from "../../util/forceStatusMailserver"

// Config variables
const { httpProvider } = config.whisper;
const mailserver = config.mailservers['mail-03.gc-us-central1-a.eth.beta'];
const { corsProxy } = config;

// Status public channel
const channel = 'test999';

/*
******************
Thunks
******************
 */

// Instantiates a new status instance and creates an anonymous keypair on page load
export const connectStatus = (pKey = undefined) => async (
  dispatch,
  getState,
) => {
  const status = new StatusJS();
  console.log('NEW STATUS', status);
  console.log(pKey);
  dispatch(newStatusInstanceAction(status));
  try {
    dispatch(startLoginAction());
    const { keyId, publicKey, userName } = await loginWithStatus(status, pKey);
    console.log(
      'Status KeyId:',
      keyId,
      'publicKey:',
      publicKey,
      'userName:',
      userName,
    );
    dispatch(finishLoginAction());
    dispatch(statusConnectAction(keyId, publicKey, userName));
  } catch (err) {
    dispatch(finishLoginAction());
    console.log(new Error(err));
  }
};

// Sends message to any whisper publicKey through Status
export const sendStatusMessage = (payload, publicKey) => async (
  dispatch,
  getState,
) => {
  await sendMessage(payload, publicKey);
};

// Creates listeners for public and private chat channels
// Should be called after new keypair / status account login
export const createStatusListener = () => async (dispatch, getState) => {
  const { status } = getState().whisper;

  // Join public chat
  await status.joinChat(channel);

  // Public message listener
  status.onMessage(channel, (err, data) => {
    if (data) console.log('Channel Message:', data.payload);
  });

  // Private message listener
  // payload[1][0] extrapolates the original JSON from the recieved data
  status.onMessage((err, data) => {
    if (data) {
      const payload = JSON.parse(data.payload);
      console.log(`Payload Received! Payload: ${JSON.stringify(payload)}`);
      dispatch(receivedStatusMessageAction(payload[1][0]));
      _incrementNewMessageCounter();
      _enqueueSnackbar(`Message(s) recieved!`, { variant: 'info' });
    }
  });
};

// Queries for historic messages
export const statusUseMailservers = () => async (dispatch, getState) => {
  const { status } = getState().whisper;
  const enode = mailserver;

  dispatch(startRequestMessagesAction());

  try {
    //
    status.mailservers.useMailserver(enode, (err, res) => {
      console.log('statusUseMailservers: Using mailserver enode:', enode, res);

      // 24hr time window from current timestamp
      const from = parseInt(new Date().getTime() / 1000 - 86400, 10);
      const to = parseInt(new Date().getTime() / 1000, 10)

      // Request user / private messages from mailservers
      // _enqueueSnackbar("Requesting messages from mailserver...", {variant: 'default'})
      status.mailservers.requestUserMessages({ from, to }, (err, res) => {
        dispatch(finishRequestMessagesAction());
        if (err) {
          console.log(new Error('requestUserMessages: err:', err), err.message);
          return _enqueueSnackbar(err, { variant: 'error' });
        }
        console.log('requestUserMessages: res:', res);
        return _enqueueSnackbar('Requested messages from mailserver.', {
          variant: 'success',
        });
      });
    });
  } catch (err) {
    console.log(new Error(err));
  }
};

/*
******************
Helper functions
******************
 */

// Helper fn - Call methods on status-js to create / log into a keypair with status
export const loginWithStatus = (
  status,
  privateKey = null,
  provider = corsProxy + httpProvider,
) =>
  new Promise(async (resolve, reject) => {
    try {
      console.log(
        'loginWithStatus: about to log in in with status provider:',
        provider,
      );
      _enqueueSnackbar(`Attempting to login...`, { variant: 'default' });
      await status.connect(provider, privateKey);
      const keyId = await status.getKeyId();
      const publicKey = await status.getPublicKey();
      const userName = await status.getUserName();
      _enqueueSnackbar(`Logged In as ${userName}!`, { variant: 'info' });
      resolve({ keyId, publicKey, userName });
    } catch (err) {
      console.log('loginWithStatus:', err);
      _enqueueSnackbar(`Failed to login to Status. Check Console`, {
        variant: 'error',
      });
      reject(err);
    }
  });

export const sendMessage = (payload, publicKey) =>
  new Promise((resolve, reject) => {
    const { status } = store.getState().whisper;
    console.log('Trying to send message over Status.. ');
    status.sendUserMessage(publicKey, payload, (err, res) => {
      if (err) {
        _enqueueSnackbar(`Error Sending Message.`, { variant: 'error' });
        return reject(err);
      }
      console.log(
        'sendStatusMessage: PAYLOAD SENT OVER STATUS:',
        payload,
        'SENT TO PUBLICKEY:',
        publicKey,
      );
      store.dispatch(sendStatusMessageAction(payload));
      _enqueueSnackbar(`Message sent!`, { variant: 'success' });
      resolve(true);
    });
  });


// Queries for historic messages
export const queryMailserver = (privateKey, mailserver=null) => {
  forceMailserverQuery(privateKey, mailserver);
};

/*
******************
Action Creators
******************
 */

const newStatusInstanceAction = statusInstance => ({
  type: NEW_STATUS_INSTANCE,
  payload: statusInstance,
});

const sendStatusMessageAction = payload => ({
  type: SEND_WHISPER_MESSAGE,
  payload,
});

const receivedStatusMessageAction = payload => ({
  type: RECEIVED_MESSAGE,
  payload,
});

export const statusConnectAction = (
  statusKeypairId,
  statusPublicKey,
  statusUsername,
) => ({
  type: STATUS_CONNECTED,
  payload: { statusKeypairId, statusPublicKey, statusUsername },
});

export const startLoginAction = () => ({
  type: 'START_LOGIN',
});

export const finishLoginAction = () => ({
  type: 'FINISH_LOGIN',
});

export const startRequestMessagesAction = () => ({
  type: 'START_REQUEST_MESSAGES',
});

export const finishRequestMessagesAction = () => ({
  type: 'FINISH_REQUEST_MESSAGES',
});
