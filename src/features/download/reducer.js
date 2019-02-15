import {
  IPFS_GET_FILE,
  DECRYPT_FILE,
  START_DOWNLOAD,
  FINISH_DOWNLOAD,
} from '../../state/types';

const initialState = {
  decrypted: {
    decryptedBuffer: [],
    fileName: '',
  },
  encryptedFile: [],
  isDownloading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case DECRYPT_FILE:
      return {
        ...state,
        decrypted: action.payload,
      };
    case IPFS_GET_FILE:
      return {
        ...state,
        encryptedFile: action.payload,
      };

    case START_DOWNLOAD:
      return {
        ...state,
        isDownloading: true,
      };
    case FINISH_DOWNLOAD:
      return {
        ...state,
        isDownloading: false,
      };

    default:
      return state;
  }
}
