import { IPFS_ADD_FILE, ENCRYPT_FILE, FILE_UPLOADED } from '../../state/types';
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
  dispatch(fileUploadedAction(fileName, mimeType, filePreview, fileBuffer));
};

export const encryptAndAddFile = (fileBuffer, fileName) => async dispatch => {
  try {
    // Encrypt file, then push buffer to store
    const { encryptedBuffer, key, iv } = await encryptFile(fileBuffer);
    console.log('encryptAndAddFile: key/iv:', key, iv);
    dispatch(encryptFileAction(encryptedBuffer, key, null, fileName));

    // Upload File to IPFS, push hash & filename to store
    const { path, hash } = await ipfsAddFile(encryptedBuffer, fileName);
    dispatch(ipfsAddFileAction(path, hash));
  } catch (err) {
    console.log(err.message);
  }
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

/*
******************
 Action Creators
******************
 */
const fileUploadedAction = (fileName, mimeType, filePreview, fileBuffer) => ({
  type: FILE_UPLOADED,
  payload: {
    fileName,
    mimeType,
    filePreview,
    fileBuffer,
  },
});

const encryptFileAction = (
  encryptedBuffer,
  decryptionKey,
  decryptionIv,
  fileName,
) => ({
  type: ENCRYPT_FILE,
  payload: {
    encryptedBuffer,
    decryptionKey,
    decryptionIv,
    fileName,
  },
});

const ipfsAddFileAction = (filePath, fileHash) => ({
  type: IPFS_ADD_FILE,
  payload: { filePath, fileHash },
});
