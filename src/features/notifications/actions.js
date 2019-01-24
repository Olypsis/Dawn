import {
	PROCESS_NOTIFICATIONS_QUEUE,
	OPEN_NOTIFICATION,
	CLOSE_NOTIFICATION,
	PUSH_NOTIFICATION,
} from '../../state/types';

import store from '../../state/store';

/*
******************
Thunks
******************
 */

// Sets notification "open" state to `true`
export const openNotification = () => async dispatch => {
	return await dispatch(openNotificationAction());
};

// Sets notification "open" state to `false`
export const closeNotification = () => async dispatch => {
	return await dispatch(closeNotificationAction());
};

// Gets the next item in the notifications queue and displays it
export const processQueue = () => async dispatch => {
	return await _processQueue();
};


// Sets notification "open" state to `false`
export const pushNotificationToQueue = message => async (dispatch) => {
	return await _pushNotificationToQueue(message)
};

/*
******************
Non-Thunk Helper Functions
******************
 */

export const _processQueue = () => {
	const { queue } = store.getState().notifications;
	if (queue.length > 0) {
		store.dispatch(processNotificiationsQueueAction());
	}
};

export const _pushNotificationToQueue = (message) => {
	const { open } = store.getState().notifications;
	store.dispatch(pushNotificationAction(message));
	if (open) {
		// immediately begin dismissing current message
		// to start showing new one
		store.dispatch(closeNotificationAction());
	} else {
		_processQueue();
	}
};

/*
******************
Action Creators
******************
 */

const processNotificiationsQueueAction = () => ({
	type: PROCESS_NOTIFICATIONS_QUEUE,
});

const openNotificationAction = () => ({
	type: OPEN_NOTIFICATION,
});

const closeNotificationAction = () => ({
	type: CLOSE_NOTIFICATION,
});

const pushNotificationAction = message => ({
	type: PUSH_NOTIFICATION,
	payload: {
		message,
		key: new Date().getTime(),
	},
});
