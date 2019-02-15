import {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR,
  INCREMENT_NEW_MESSAGE_COUNTER,
  CLEAR_NEW_MESSAGE_COUNTER,
} from '../../state/types';

const initialState = {
  messageInfo: {},
  newMessageNum: 0,
  notifications: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_NEW_MESSAGE_COUNTER:
      return {
        ...state,
        newMessageNum: state.newMessageNum + 1,
      };

    case CLEAR_NEW_MESSAGE_COUNTER:
      return {
        ...state,
        newMessageNum: 0,
      };

    case ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
          },
        ],
      };

    case REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.key !== action.payload,
        ),
      };

    default:
      return state;
  }
}
