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
import node from '../../util/ipfs';
import { encrypt } from '../../util/encrypt';

/*
******************
Thunks
******************
 */

// On File Uploaded
export const onFileUploaded = (
  fileName,
  mimeType,
  filePreview,
  fileBuffer,
) => async dispatch => {
  dispatch(fileReadAction(fileName, mimeType, filePreview, fileBuffer));
};

export const encryptAndAddFile = () => async (dispatch, getState) => {
  const { fileQueue } = getState().upload;

  try {
    dispatch(uploadStartingAction());

    // Read file from queue
    const file = fileQueue[0];
    const fileBuffer = await readFile(file);
    dispatch(fileReadAction(file.name, file.type, file.preview, fileBuffer));

    // Encrypt file, then push buffer to store
    dispatch(startEncryptFileAction());
    const { encryptedBuffer, key, iv } = await encryptFile(fileBuffer);
    console.log('encryptAndAddFile: key/iv:', key, iv);
    dispatch(finishEncryptFileAction(encryptedBuffer, key, null, file.name));

    // Upload File to IPFS, push hash & filename to store
    dispatch(startIpfsAddFileAction());
    const { path, hash } = await ipfsAddFile(encryptedBuffer, file.name);
    dispatch(finishIpfsAddFileAction(path, hash));
    dispatch(uploadFinishedAction());
  } catch (err) {
    console.log(err.message);
  }
};

export const pushFileToQueue = file => dispatch => {
  dispatch(pushFileToQueueAction(file));
  console.log('pushFileToQueue: pushed file to queue: ', file.name);
};

export const clearFileQueue = () => dispatch => {
  dispatch(clearFileQueueAction());
};

/*
******************
 Helper Functions
******************
 */

// Helper fn - Add file to IPFS
const ipfsAddFile = async (buffer, fileName) => {
  const filesAdded = await node.add({
    content: buffer,
    path: fileName,
  });
  const { path, hash } = filesAdded[0];
  console.log('Added file:', path, hash);
  return { path, hash };
  // dispatch(ipfsAddFileAction(filesAdded[0].path, filesAdded[0].hash));
};

// Helper fn - Encrypt File
const encryptFile = async fileBuffer => {
  const encryptedPayload = await encrypt(fileBuffer);
  const { encryptedBuffer, iv, key } = encryptedPayload;
  console.log('encryptFile: File Buffer: ', fileBuffer);
  console.log('encryptFile: Encrypted Buffer:', encryptedBuffer);
  console.log('encryptFile: Key/IV:', iv);
  return { encryptedBuffer, iv, key };
};

// Helper fn - Read File
const readFile = async file =>
  new Promise((resolve, reject) => {
    try {
      // Create FileReader and read file
      const reader = new FileReader();
      console.log('readFile: about to read file...');
      reader.readAsArrayBuffer(file);
      reader.onloadend = async () => {
        // Convert file from blob to buffer
        const fileBuffer = Buffer.from(reader.result);
        console.log('readFile: file read!');
        resolve(fileBuffer);
        // // Log Upload File Success
        // await this.props.onFileUploaded(
        //   file.name,
        //   file.type,
        //   file.preview,
        //   fileBuffer,
        // );

        // await this.props.encryptAndAddFile(fileBuffer, file.name);

        // resolve(true);
      };
    } catch (err) {
      reject('readFile:', new Error(err));
    }
  });

/*
******************
 Action Creators
******************
 */
const fileReadAction = (fileName, mimeType, filePreview, fileBuffer) => ({
  type: FILE_READ,
  payload: {
    fileName,
    mimeType,
    filePreview,
    fileBuffer,
  },
});

const pushFileToQueueAction = file => ({
  type: PUSH_FILE_TO_QUEUE,
  payload: file,
});

const clearFileQueueAction = () => ({
  type: CLEAR_FILE_QUEUE,
});

const startEncryptFileAction = () => ({
  type: START_ENCRYPT_FILE,
});

const finishEncryptFileAction = (
  encryptedBuffer,
  decryptionKey,
  decryptionIv,
  fileName,
) => ({
  type: FINISH_ENCRYPT_FILE,
  payload: {
    encryptedBuffer,
    decryptionKey,
    decryptionIv,
    fileName,
  },
});

const startIpfsAddFileAction = () => ({
  type: START_IPFS_ADD_FILE,
});

const finishIpfsAddFileAction = (filePath, fileHash) => ({
  type: FINISH_IPFS_ADD_FILE,
  payload: { filePath, fileHash },
});

const uploadStartingAction = () => ({
  type: UPLOAD_START,
});

const uploadFinishedAction = () => ({
  type: UPLOAD_FINISHED,
});
