import { SEND_WHISPER_MESSAGE, RECEIVED_MESSAGE , CLEAR_EVENTS} from '../../state/types';
// import isEmpty from '../utils/is-empty';

const initialState = {
  events: [],
  received_messages: [],
  sent_messages: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEND_WHISPER_MESSAGE:
      return {
        ...state,
        sent_messages: [...state.sent_messages, action.payload],
        events: [...state.events, { type: 'SENT', payload: action.payload }],
      };
    case RECEIVED_MESSAGE:
      return {
        ...state,
        received_messages: [...state.received_messages, action.payload],
        events: [
          ...state.events,
          { type: 'RECEIVED', payload: action.payload },
        ],
      };
    case CLEAR_EVENTS:
      return initialState;
    default:
      return state;
  }
}
