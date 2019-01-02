import { METAMASK_CONNECT, METAMASK_LOGIN } from '../../state/types';

import node from '../../util/ipfs';
import { decrypt } from '../../util/encrypt';
import fileDownload from 'js-file-download';

// store
import store from '../../state/store';

// Web3
import Web3 from 'web3';

// Whisper functions
import { updateWhisperIdentityAction } from '../whisper/actions';

export const signMetamaskLogin = () => async (dispatch, getState) => {
	const web3 = getState().web3.web3Instance;
	const { shh } = getState().whisper;

	const msg =
		'Logging into DAWN with Metamask.';
	const accounts = await web3.eth.getAccounts();
	const from = accounts[0];

	if (!from) return connectMetamask();

	try {
		const hash = await web3.eth.sign(msg, from);

		// alert(`LOGIN SIGNED: ${hash}`);

		const loginHash = hash.slice(0, 66);
		dispatch(signLoginMetamaskAction(loginHash));

		let pubKey, privateKey, keyPairId;

		keyPairId = await shh.addPrivateKey(loginHash);
		pubKey = await shh.getPublicKey(keyPairId);
		privateKey = await shh.getPrivateKey(keyPairId);

		console.log(
			'loginHash:',
			loginHash,
			'\nkeyPairId',
			keyPairId,
			'\npubKey:',
			pubKey,
			'\nprivateKey',
			privateKey,
		);

		const newIdentity = {
			keyPairId,
			pubKey,
			privateKey,
		};

		dispatch(updateWhisperIdentityAction(newIdentity));
	} catch (err) {
		console.log(new Error(err.message));
	}
};

// Tries downloading and Decrypting the file given payload
export const connectMetamask = async () => {
	if (typeof window.ethereum !== 'undefined') {
		try {
			await window.ethereum.enable();
			store.dispatch(connectMetamaskAction());
		} catch (err) {
			console.log(err);
		}
	}
};

//////////////////
// Action Creators
const connectMetamaskAction = () => ({
	type: METAMASK_CONNECT,
});

const signLoginMetamaskAction = loginHash => ({
	type: METAMASK_LOGIN,
	payload: loginHash,
});
