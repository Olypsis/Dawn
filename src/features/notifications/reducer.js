import { ADD_NOTIFICATION, REMOVE_NOTIFICATION, PROCESS_NOTIFICATION_QUEUE } from '../../state/types';

const initialState = {
  open: false,
  queue: [],
  messageInfo: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        open: !state.open,
      };
    case OPEN_DRAWER:
      return {
        ...state,
        open: true,
      };
    case CLOSE_DRAWER:
      return {
        ...state,
        open: false,
      };

    default:
      return state;
  }
}
