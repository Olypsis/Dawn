import {
  PROCESS_NOTIFICATIONS_QUEUE,
  OPEN_NOTIFICATION,
  CLOSE_NOTIFICATION,
  PUSH_NOTIFICATION,
  INCREMENT_NEW_MESSAGE_COUNTER,
  CLEAR_NEW_MESSAGE_COUNTER,
} from '../../state/types';

const initialState = {
  open: false,
  queue: [],
  messageInfo: {},
  newMessageNum: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PUSH_NOTIFICATION:
      return {
        ...state,
        queue: [
          ...state.queue,
          {
            message: action.payload.message,
            key: action.payload.key,
          },
        ],
      };
    case OPEN_NOTIFICATION:
      return {
        ...state,
        open: true,
      };
    case CLOSE_NOTIFICATION:
      return {
        ...state,
        open: false,
      };

    case PROCESS_NOTIFICATIONS_QUEUE:
      return {
        ...state,
        messageInfo: state.queue.shift(),
        open: true,
      };

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

    default:
      return state;
  }
}
