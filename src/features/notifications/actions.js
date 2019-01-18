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

export const openNotification = () => dispatch => {
	dispatch(openNotificationAction());
};

export const processQueue = () => dispatch => {
	_processQueue();
};

export const closeNotification = () => dispatch => {
	dispatch(closeNotificationAction());
};

export const pushNotificationToQueue = message => (dispatch, getState) => {
	const { open } = getState().notifications;
	dispatch(pushNotificationAction(message));
	if (open) {
		// immediately begin dismissing current message
		// to start showing new one
		dispatch(closeNotificationAction());
	} else {
		_processQueue();
	}
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
