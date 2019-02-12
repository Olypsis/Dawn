import {
	REMOVE_SNACKBAR,
	ENQUEUE_SNACKBAR,
	CLOSE_NOTIFICATION,
	PUSH_NOTIFICATION,
	INCREMENT_NEW_MESSAGE_COUNTER,
	CLEAR_NEW_MESSAGE_COUNTER,
} from '../../state/types';

import store from '../../state/store';

/*
******************
Thunks
******************
 */


export const incrementNewMessageCounter = () => dispatch =>
	dispatch(incrementNewMessageCounterAction());

export const clearMessageCounter = () => dispatch =>
	dispatch(clearNewMessageCounterAction());


export const enqueueSnackbar = (message, options) => dispatch =>
	dispatch(enqueueSnackbarAction(message, options));

export const removeSnackbar = key => dispatch =>
	dispatch(removeSnackbarAction(key));


/*
******************
Non-Thunks 
******************
 */


export const _incrementNewMessageCounter = () =>
	store.dispatch(incrementNewMessageCounterAction());

export const _clearMessageCounter = () =>
	store.dispatch(clearNewMessageCounterAction());

export const _enqueueSnackbar = (message, options) =>
	store.dispatch(enqueueSnackbarAction(message, options));

export const _removeSnackbar = key =>
	store.dispatch(removeSnackbarAction(key));


/*
******************
Action Creators
******************
 */


// Unread Incoming Message
const incrementNewMessageCounterAction = () => ({
	type: INCREMENT_NEW_MESSAGE_COUNTER,
});

// Unread Incoming Messages = 0
const clearNewMessageCounterAction = () => ({
	type: CLEAR_NEW_MESSAGE_COUNTER,
});



export const enqueueSnackbarAction = (message, options) => ({
    type: ENQUEUE_SNACKBAR,
    payload: {
        key: new Date().getTime() + Math.random(),
        message,
        options
    },
});

export const removeSnackbarAction = key => ({
    type: REMOVE_SNACKBAR,
    payload: key,
});


