// Redux
import store from '../../state/store';
import { METAMASK_CONNECT, METAMASK_LOGIN } from '../../state/types';
// Status Actions and helper functions
import { loginWithStatus, statusConnectAction} from '../whisper/actions_status';

/*
******************
Thunks
******************
 */

export const signMetamaskLogin = () => async (dispatch, getState) => {
	const web3 = getState().web3.web3Instance;
	const { status } = getState().whisper;

	const msg =
		'Logging into DAWN with Metamask.';

	const from = await web3.eth.getAccounts().then(accounts => accounts[0]);

	// Prompt for Metamask connect if access not yet granted (privacy mode enabled)
	if (!from) return connectMetamask();

	try {
		const hash = await web3.eth.sign(msg, from);
		console.log(`LOGIN SIGNED: ${hash}`);

		// Slice into 64char hexstring prefixed with "0x"
		const loginHash = hash.slice(0, 66);
		dispatch(signLoginMetamaskAction(loginHash));

		// Log into status using hexstring as PK
		const { keyId, publicKey, userName } = await loginWithStatus(status, undefined, loginHash);
		return dispatch(statusConnectAction(keyId, publicKey, userName));
	} catch (err) {
		console.log(err);
	}
};

// Checks for injected Metamask 
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

/*
******************
Action Creators 
******************
 */

const connectMetamaskAction = () => ({
	type: METAMASK_CONNECT,
});

const signLoginMetamaskAction = loginHash => ({
	type: METAMASK_LOGIN,
	payload: loginHash,
});
