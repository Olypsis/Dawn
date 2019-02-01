import {
  IPFS_ADD_FILE,
  ENCRYPT_FILE,
  FILE_READ,
  PUSH_FILE_TO_QUEUE,
  CLEAR_FILE_QUEUE,
  UPLOAD_START,
  UPLOAD_FINISHED,
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
  rawFile: {
    fileName: '',
    mimeType: '',
    filePreview: '',
    fileBuffer: [],
  },
  fileQueue: [],
  uploading: false,
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
    case FILE_READ:
      return {
        ...state,
        rawFile: action.payload,
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
    case UPLOAD_START:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_FINISHED:
      return {
        ...state,
        uploading: false,
      };
    default:
      return state;
  }
}
