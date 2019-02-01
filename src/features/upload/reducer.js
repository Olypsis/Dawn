import {
  UPLOAD_START,
  UPLOAD_FINISHED,
  START_IPFS_ADD_FILE,
  FINISH_IPFS_ADD_FILE,
  START_ENCRYPT_FILE,
  FINISH_ENCRYPT_FILE,
  FILE_READ,
  PUSH_FILE_TO_QUEUE,
  CLEAR_FILE_QUEUE,
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
  transferStatus: {
    isUploading: false,
    isEncrypting: false,
    isAddingToIPFS: false,
    isFinished: false,
  },
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_START:
      return {
        ...state,
        uploading: true,
        transferStatus: { ...initialState.transferStatus, isUploading: true },
      };
    case START_IPFS_ADD_FILE:
      return {
        ...state,
        transferStatus: {
          ...initialState.transferStatus,
          isAddingToIPFS: true,
        },
      };
    case START_ENCRYPT_FILE:
      return {
        ...state,
        transferStatus: { ...initialState.transferStatus, isEncrypting: true },
      };

    case FINISH_IPFS_ADD_FILE:
      return {
        ...state,
        ipfsAddedFile: action.payload,
        transferStatus: { ...state.transferStatus, isAddingToIPFS: false },
      };
    case FINISH_ENCRYPT_FILE:
      return {
        ...state,
        encryptedFile: action.payload,
        transferStatus: { ...state.transferStatus, isEncrypting: false },
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
    case UPLOAD_FINISHED:
      return {
        ...state,
        transferStatus: { ...state.transferStatus, isFinished: true },
      };
    default:
      return state;
  }
}
