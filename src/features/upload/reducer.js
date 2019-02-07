import {
  TRANSFER_START,
  TRANSFER_FINISHED,
  UPLOAD_START,
  UPLOAD_FINISHED,
  START_IPFS_ADD_FILE,
  FINISH_IPFS_ADD_FILE,
  START_ENCRYPT_FILE,
  FINISH_ENCRYPT_FILE,
  SEND_START,
  SEND_FINISHED,
  FILE_READ,
  PUSH_FILE_TO_QUEUE,
  CLEAR_FILE_QUEUE,
  CLEAR_UPLOAD_STATE
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
  transferStatus: {
    isUploading: false,
    isEncrypting: false,
    isAddingToIPFS: false,
    isSendingMessage: false, 
    isFinished: false,
    isTransfering: false, 
  },
  finishedTransfer: {
    burnerLink: '',
    publicKey: ''
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case TRANSFER_START:
      return {
        ...state,
        transferStatus: { ...initialState.transferStatus, isTransfering: true },
      };
    case TRANSFER_FINISHED:
      return {
        ...state,
        transferStatus: { ...initialState.transferStatus, isFinished: true },
        finishedTransfer: { publicKey: action.payload.publicKey, burnerLink: action.payload.url }
      };

    case UPLOAD_START:
      return {
        ...state,
        uploading: true,
        transferStatus: { ...initialState.transferStatus, isTransfering: true, isUploading: true },
      };
    case UPLOAD_FINISHED:
      return {
        ...state,
        transferStatus: { ...state.transferStatus, isUploading: false },
      };

    case START_IPFS_ADD_FILE:
      return {
        ...state,
        transferStatus: {
          ...initialState.transferStatus,
          isTransfering: true,
          isAddingToIPFS: true,
        },
      };
    case FINISH_IPFS_ADD_FILE:
      return {
        ...state,
        ipfsAddedFile: action.payload,
        transferStatus: { ...state.transferStatus, isAddingToIPFS: false },
      };

    case START_ENCRYPT_FILE:
      return {
        ...state,
        transferStatus: { ...initialState.transferStatus, isTransfering: true, isEncrypting: true },
      };
    case FINISH_ENCRYPT_FILE:
      return {
        ...state,
        encryptedFile: action.payload,
        transferStatus: { ...state.transferStatus, isEncrypting: false },
      };

    case SEND_START:
      return {
        ...state,
        transferStatus: { ...initialState.transferStatus, isTransfering: true, isSendingMessage: true },
      };
    case SEND_FINISHED:
      return {
        ...state,
        transferStatus: { ...state.transferStatus, isSendingMessage: false },
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


    case CLEAR_UPLOAD_STATE:
      return initialState;
    default:
      return state;
  }
}
