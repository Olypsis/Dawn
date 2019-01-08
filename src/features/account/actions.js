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

// Status functions
import { loginWithStatus, statusConnectAction} from '../whisper/actions_status';

export const signMetamaskLogin = () => async (dispatch, getState) => {
	const web3 = getState().web3.web3Instance;
	const { status } = getState().whisper;

	const msg =
		'Logging into DAWN with Metamask.';
	const accounts = await web3.eth.getAccounts();
	const from = accounts[0];

	// Prompt Metmask connect if access is not granted (privacy mode)
	if (!from) return connectMetamask();

	try {
		const hash = await web3.eth.sign(msg, from);

		console.log(`LOGIN SIGNED: ${hash}`);

		const loginHash = hash.slice(0, 66);
		dispatch(signLoginMetamaskAction(loginHash));

		// Login With Status
		const { keyId, publicKey, userName } = await loginWithStatus(status, undefined, loginHash);
		return dispatch(statusConnectAction(keyId, publicKey, userName));

	} catch (err) {
		console.log(err.message);
	}
};

// Tries downloading and Decrypting the file given payload
export const connectMetamask = async () => {
	if (typeof window.ethereum !== 'undefined') {
		try {
			await window.ethereum.enable();
			return store.dispatch(connectMetamaskAction());
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
