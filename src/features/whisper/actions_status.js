import Web3 from 'web3';
import util from 'ethjs-util';
import StatusJS from 'status-js-api';
import isEmpty from '../../util/is-empty';
// config
import config from '../../config';
import {
  NEW_STATUS_INSTANCE,
  STATUS_CONNECTED,
  SEND_WHISPER_MESSAGE,
  RECEIVED_MESSAGE
} from '../../state/types';

// Whisper calls
import { getWhisperInfo, shhext_post } from '../../util/whispercalls';

// config variables
const { httpProvider } = config.whisper;
const { corsProxy } = config;
const mailserver = config.mailservers['mail-03.gc-us-central1-a.eth.beta'];
const channel = 'test999';

/*
******************
Thunks
******************
 */

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

// Send message to a Whisper publicKey over Status
export const sendStatusMessage = (payload, publicKey) => async (
  dispatch,
  getState,
) => {
  const { status } = getState().whisper;

  status.sendUserMessage(publicKey, payload, (err, res) => {
    console.log('sendStatusMessage: PAYLOAD SENT OVER STATUS:', payload);
    dispatch(sendStatusMessageAction(payload));
  });
};



// Create listeners for public and private chat channels
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
      console.log(
        `Payload Received! Payload: ${JSON.stringify(payload)}`,
      );
      dispatch(receivedStatusMessageAction(payload[1][0]));
    }
  });
};


export const statusUseMailservers = () => async (dispatch, getState) => {
  const { status } = getState().whisper;
  const enode = mailserver;

  try {
    // 
    status.mailservers.useMailserver(enode, (err, res) => {
      console.log('statusUseMailservers: Using mailserver enode:', enode, res);

      // 24hr time window from current timestamp
      let from = parseInt(new Date().getTime() / 1000 - 86400, 10);
      let to = parseInt(new Date().getTime() / 1000, 10);

      // Request public channel messages from mailservers
      status.mailservers.requestChannelMessages(
        channel,
        { from, to },
        (err, res) => {
          if (err) console.log(err);
          console.log('requestChannelMessages: res:', res);
        },
      );

      // Request user / private messages from mailservers
      status.mailservers.requestUserMessages({ from, to }, (err, res) => {
        if (err) console.log(err);
        console.log('requestUserMessages: res:', res);
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



