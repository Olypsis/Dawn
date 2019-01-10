/*
****************************************************
UNUSED after migrating to status-js.

Actions rewritten using status-js can be found in
"/src/features/whisper/actions_status.js"
****************************************************
*/

import Web3 from 'web3';
import util from 'ethjs-util';
import isEmpty from '../../util/is-empty';
import {
  GET_WHISPER,
  SEND_WHISPER_MESSAGE,
  CREATE_LISTENER,
  RECEIVED_MESSAGE,
  SET_WHISPER_PROVIDER,
  SET_WHISPER,
  CREATE_MESSAGE_FILTER,
  UPDATE_WHISPER_IDENTITY,
} from '../../state/types';

// Whisper calls
import {
  getWhisperInfo,
  shhext_post,
  shhext_getNewFilterMessages,
  shhext_requestMessages,
} from '../../util/whispercalls';

let enode = 'enode://015e22f6cd2b44c8a51bd7a23555e271e0759c7d7f52432719665a74966f2da456d28e154e836bee6092b4d686fe67e331655586c57b718be3997c1629d24167@35.226.21.19:30504'
enode = "enode://015e22f6cd2b44c8a51bd7a23555e271e0759c7d7f52432719665a74966f2da456d28e154e836bee6092b4d686fe67e331655586c57b718be3997c1629d24167@35.226.21.19:30504"

const test = () => async dispatch => alert('test');

const topic1 = '1234';
const topic2 = '5678';

export const setWhisper = (wsProvider, httpProvider) => async dispatch => {
  let web3, provider;
  if (!isEmpty(wsProvider)) {
    web3 = new Web3(new Web3.providers.WebsocketProvider(wsProvider));
    provider = wsProvider;
  } else if (!isEmpty(httpProvider)) {
    web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
    provider = httpProvider;
  }
  dispatch(setWhisperProviderAction(provider));
  const shh = web3.shh;
  dispatch(setWhisperAction(shh));
  console.log('setWhisper: Set `shh` with provider:', provider);
};

export const getWhisper = shh => async (dispatch, getState) => {

  const { shh } = getState().whisper

  try {
    console.log('getWhisper: Shh Current Provider', shh.currentProvider);
    console.log('getWhisper: Shh Given Provider:', shh.givenProvider);

    // Get node info
    const info = await shh.getInfo();
    // const isListening = await shh.net.isListening();
    // const peerCount = await shh.net.getPeerCount();
    // const netId = await shh.net.getId();

    console.log("getWhisper: shh Get Info:", info)
    // Get Identity
    const keyPairId = await shh.newKeyPair();
    console.log("getWhisper: shh new keyPair:", keyPairId)

    const symKeyId = await shh.newSymKey();
    const publicKey = await shh.getPublicKey(keyPairId);
    const privateKey = await shh.getPrivateKey(keyPairId);
    const whisper = {
      info,
      // isListening,
      // peerCount,
      // netId,
      keyPairId,
      symKeyId,
      publicKey,
      privateKey,
    };
    console.log("getWhisper: New Anonymous Whisper Peer Identity!", whisper)
    return dispatch(getWhisperAction(whisper));
  } catch (err) {
    console.log("getWhisper: Couldn't Get Whisper Details: ", err.message);
    return new Error(err.message);
  }
};

export const sendMessage = (payload, publicKey) => async (dispatch, getState) => {
  const { shh } = getState().whisper;
  console.log('PAYLOAD 0:', payload);

    // Set options
  let opts = {
    pubKey: publicKey,
    sig: getState().whisper.details.keyPairId, // signs the message using the keyPair ID
    ttl: 10,
    // topic: '0xffaadd11',
    topic: util.fromAscii(topic1),
    payload: util.fromAscii(JSON.stringify(payload)),
    powTime: 3,
    powTarget: 0.5,
  };

  // shhext_post
  try {
    const response = await shhext_post(opts);
    const hash = JSON.parse(response).result;
    console.log(`sendMessage: Message with hash ${hash} was successfuly sent`);
    console.log('sendMessage: PAYLOAD:', payload);
    dispatch(sendMessageAction(payload));
  } catch (err) {
    console.log('sendMessage: Error: ', err);
  }
};

export const createListener = () => async (dispatch, getState) => {
  const { shh } = getState().whisper;
  const keyPairID = getState().whisper.details.keyPairId;

  // Constant Topic for listener
  let topics = [topic1];
  topics = topics.map(t => util.fromAscii(t));

  // Create a new subscription
  const subscription = await shh
    .subscribe('messages', {
      privateKeyID: keyPairID,
      topics,
      allowP2P: true,
    })
    .on('data', data => {
      const payload = JSON.parse(util.toAscii(data.payload));
      dispatch(receivedMessageAction(payload));
      console.log(`Hash Received! Hash: ${payload.hash}`);
    });
  console.log('createListener: SUBSCRIPTION CREATED', subscription);

  // Create New Message Filter
  const newMessageFilter = await shh.newMessageFilter({
    privateKeyID: keyPairID,
    topics,
    allowP2P: true,
  });
  console.log('createListener: MESSAGE FILTER CREATED', newMessageFilter);

  dispatch(createListenerAction(subscription));
  dispatch(createMessageFilterAction(newMessageFilter));

  // Log
  console.log(
    'createListener: Created Listener! Listening for topics:',
    topics.map(t => util.toAscii(t)),
  );
};

export const markTrustedEnode = () => async (dispatch, getState) => {
  const { shh } = getState().whisper;
  try {
    console.log(enode);
    const res = await shh.markTrustedPeer(enode);
    if (res) {
      console.log('Trusted Enode! res: ', res);
    } else {
      console.log('Failed to mark Trusted enode: ', enode);
    }
  } catch (err) {
    console.log('Error in action markTrustedEnode: ', err);
  }
};

export const getFilterMessages = () => async (dispatch, getState) => {
  const { messageFilters, shh } = getState().whisper;
  // shhext_getNewFilterMessages
  try {
    messageFilters.forEach(async filter => {
      const response = await shhext_getNewFilterMessages(filter);
      const messages = JSON.parse(response).result;
      console.log('MESSAGES', messages);
      messages.map(msg => {
        console.log('GETFILTERMESSAGES', util.toAscii(msg.payload));
        const payload = JSON.parse(util.toAscii(msg.payload));
        dispatch(receivedMessageAction(payload));
      });
    });
  } catch (err) {
    console.log('Error in action getFilterMessages', err);
  }
};

export const requestHistoricMessages = () => async (dispatch, getState) => {

  const topics = [util.fromAscii(topic1)];
  const symKeyId = getState().whisper.details.symKeyId;
  const from = 1544783388;
  const to = 1544846928;

  const opts = {
      mailServerPeer: enode,
      topics: [util.fromAscii(topic1)],
      symKeyId: getState().whisper.details.symKeyId,
      from: 1544783388,
      to: 1544846928
    };

  try {
    const response = await shhext_requestMessages(opts, enode,topics, symKeyId, from, to );
    console.log('requestHistoricMessages response', response);
    // const messages = JSON.parse(response).result
    // console.log("MESSAGES", messages)
    // messages.map(msg => {
    //   console.log('GETFILTERMESSAGES', util.toAscii(msg.payload));
    //   const payload = JSON.parse(util.toAscii(msg.payload));
    //   dispatch(receivedMessageAction(payload));
    // });
  } catch (err) {
    console.log('Error in action getFilterMessages', err);
  }
};

export const getWhisperIdentityFromPassword = password => async (
  dispatch,
  getState,
) => {
  const { shh } = getState().whisper;
  try {
    // const symKeyId = await shh.generateSymKeyFromPassword(password);
    // const hasSymKey = await shh.hasSymKey(symKeyId);
    let symKeyId, symKey, pubKey, privateKey, keyPairId;

    keyPairId = await shh.addPrivateKey(password);
    pubKey = await shh.getPublicKey(keyPairId);
    privateKey = await shh.getPrivateKey(keyPairId);

    console.log(
      '\npassword:',
      password,
      '\nsymKey:',
      symKey,
      '\nkeyPairId',
      keyPairId,
      '\npubKey:',
      pubKey,
      '\nprivateKey',
      privateKey,
    );

    const newIdentity = {
      symKey,
      keyPairId,
      pubKey,
      privateKey,
    };

    dispatch(updateWhisperIdentityAction(newIdentity));
  } catch (err) {
    console.log(err);
  }
};

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

export const updateWhisperIdentityAction = details => ({
  type: UPDATE_WHISPER_IDENTITY,
  payload: details,
});
