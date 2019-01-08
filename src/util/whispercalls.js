/*

UNUSED after migrating to status-js.

Functions interacting with status-js can be found in
"/src/features/whisper/actions_status.js"

*/


const request = require('request');
const rp = require('request-promise');

const proxyurl = 'https://cors-anywhere.herokuapp.com/';
const url = 'http://104.197.46.74:8545';

const headers = {
	'Content-Type': 'application/json',
};

const callback = (error, response, body) => {
	if (!error && response.statusCode == 200) {
		console.log(body);
		return body;
	}
	if (error) {
		console.log(error);
		console.log(response);
		throw new Error(error);
	}
};

export const callWhisper = () =>
	new Promise((resolve, reject) => {
		const dataString =
			'{"jsonrpc":"2.0","method":"shh_version","params":[],"id":1}';

		const options = {
			url: proxyurl + url,
			method: 'POST',
			headers: headers,
			body: dataString,
		};

		console.log('calling whisper');
		rp(options)
			.then(response => resolve(response))
			.catch(err => reject(err));
	});

export const getWhisperInfo = () =>
	new Promise((resolve, reject) => {
		const dataString =
			'{"jsonrpc":"2.0","method":"shh_info","params":[],"id":1}';

		const options = {
			url: proxyurl + url,
			method: 'POST',
			headers: headers,
			body: dataString,
		};
		console.log('getting Whisper info');
		rp(options)
			.then(response => resolve(response))
			.catch(err => reject(err));
	});


/****
* SHHEXT API
*****/

// #### shhext_confirmMessagesProcessed
export const shhextConfirmMessagesProcessed = params =>
	new Promise((resolve, reject) => {
		const dataString =
			'{"jsonrpc":"2.0","method":"shhext_confirmMessagesProcessed","params":[],"id":1}';

		const options = {
			url: proxyurl + url,
			method: 'POST',
			headers: headers,
			body: dataString,
		};

		console.log('shhext_confirmMessagesProcessed');
		rp(options)
			.then(response => resolve(response))
			.catch(err => reject(err));
	});

// #### shhext_post
export const shhext_post = params =>
	new Promise((resolve, reject) => {
		// console.log("SSHEXT_POST PARAMS", params)

		const dataString = `{"jsonrpc":"2.0","method":"shhext_post","params":[${JSON.stringify(
			params,
		)}],"id":1}`;

		const options = {
			url: proxyurl + url,
			method: 'POST',
			headers: headers,
			body: dataString,
		};

		console.log('shhext_post', dataString);

		rp(options)
			.then(response => resolve(response))
			.catch(err => reject(err));
	});

// #### shhext_getNewFilterMessages
export const shhext_getNewFilterMessages = params =>
	new Promise((resolve, reject) => {
		console.log('SSHEXT_GETNEWFILTER PARAMS', params);

		const dataString = `{"jsonrpc":"2.0","method":"shhext_getNewFilterMessages","params":[${JSON.stringify(
			params,
		)}],"id":1}`;

		const options = {
			url: proxyurl + url,
			method: 'POST',
			headers: headers,
			body: dataString,
		};

		console.log('shhext_getNewFilterMessages', dataString);

		rp(options)
			.then(response => resolve(response))
			.catch(err => reject(err));
	});

/*
#### shhext_requestMessages

Sends a request for historic messages to a mail server.

##### Parameters

1. `Object` - The message request object:

- `mailServerPeer`:`URL` - Mail servers' enode addess
- `from`:`QUANTITY` - (optional) Lower bound of time range as unix timestamp, default is 24 hours back from now
- `to`:`QUANTITY`- (optional) Upper bound of time range as unix timestamp, default is now
- `topic`:`DATA`, 4 Bytes - Regular whisper topic
- `symKeyID`:`DATA`- ID of a symmetric key to authenticate to mail server, derived from mail server password

##### Returns

`Boolean` - returns `true` if the request was send, otherwise `false`.

*/
// TODO: what are the params here
export const shhext_requestMessages = (params, enode, topics, symKeyId, from, to) =>
	new Promise((resolve, reject) => {
		const dataString = `{"jsonrpc":"2.0","method":"shhext_requestMessages","params":[${JSON.stringify(
			params,	
		)}],"id":1}`;

		const options = {
			url: proxyurl + url,
			method: 'POST',
			headers: headers,
			body: dataString,
		};

		console.log('shhext_requestMessages', dataString);

		rp(options)
			.then(response => resolve(response))
			.catch(err => reject(err));
	});
