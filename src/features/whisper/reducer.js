import {
  GET_WHISPER,
  CREATE_LISTENER,
  SET_WHISPER,
  CREATE_MESSAGE_FILTER,
  UPDATE_WHISPER_IDENTITY,
  NEW_STATUS_INSTANCE,
  STATUS_CONNECTED,
} from '../../state/types';

const initialState = {
  details: {
    info: {},
    keyPairId: '',
    symKeyId: '',
    symKey: '',
    publicKey: '',
    privateKey: '',
  },
  shh: {},
  subscriptions: [],
  messageFilters: [],
  status: {},
  statusDetails: {
    keyPairId: '',
    publicKey: '',
    username: '',
  },
  isLoading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_WHISPER:
      return {
        ...state,
        details: action.payload,
      };
    case SET_WHISPER:
      return {
        ...state,
        shh: action.payload,
      };

    case UPDATE_WHISPER_IDENTITY:
      return {
        ...state,
        details: {
          ...state.details,
          keyPairId: action.payload.keyPairId,
          symKey: action.payload.symKey,
          symKeyId: action.payload.symKeyId,
          publicKey: action.payload.pubKey
        },
      };

    case CREATE_LISTENER:
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };

    case CREATE_MESSAGE_FILTER:
      return {
        ...state,
        messageFilters: [...state.messageFilters, action.payload],
      };

    case NEW_STATUS_INSTANCE:
      return {
        ...state,
        status: action.payload,
      };

    case STATUS_CONNECTED:
      return {
        ...state,
        statusDetails: {
          ...state.statusDetails,
          keyPairId: action.payload.statusKeypairId,
          publicKey: action.payload.statusPublicKey,
          username: action.payload.statusUsername,
        },
      };

    default:
      return state;
  }
}
