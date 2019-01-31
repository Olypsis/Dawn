import {
  IPFS_ADD_FILE,
  ENCRYPT_FILE,
  FILE_UPLOADED,
  PUSH_FILE_TO_QUEUE,
  CLEAR_FILE_QUEUE
} from '../../state/types';

const initialState = {
  ipfsAddedFile: {
    filePath: '',
    filehash: '',
  },
  encryptedFile: {
    encryptedBuffer: [],
    decryptionKey: '',
    decryptionIv: '',
    fileName: '',
  },
  uploadedFile: {
    fileName: '',
    mimeType: '',
    filePreview: '',
    fileBuffer: [],
  },
  fileQueue: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case IPFS_ADD_FILE:
      return {
        ...state,
        ipfsAddedFile: action.payload,
      };
    case ENCRYPT_FILE:
      return {
        ...state,
        encryptedFile: action.payload,
      };
    case FILE_UPLOADED:
      return {
        ...state,
        uploadedFile: action.payload,
      };
    case PUSH_FILE_TO_QUEUE:
      return {
        ...state,
        fileQueue: [...state.fileQueue, action.payload],
      };
    case CLEAR_FILE_QUEUE:
      return {
        ...state,
        fileQueue: [],
      };
    default:
      return state;
  }
}
