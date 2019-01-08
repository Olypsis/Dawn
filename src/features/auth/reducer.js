import {
  UPDATE_WHISPER_IDENTITY,
  // CREATE_ETH_ACCOUNT
} from '../../state/types';

const initialState = {
  ethereum: {
    address: {},
    privateKey: '',
  },
  shh: {},
  subscriptions: [],
  messageFilters: [],
  status: {},
  statusDetails: {
    publicKey: '',
    userName: '',
    
  }
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
          publicKey: action.payload.privateKey,
          publicKey: action.payload.pubKey,
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
      };

    default:
      return state;
  }
}
