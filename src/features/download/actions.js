import { IPFS_GET_FILE, DECRYPT_FILE, DOWNLOAD_FILE } from '../../state/types';
import node from '../../util/ipfs';
import { decrypt } from '../../util/encrypt';
import fileDownload from 'js-file-download';

/*
******************
Thunks
******************
 */

// Tries downloading and Decrypting the file given payload
export const downloadAndDecryptFile = (
  hash,
  fileName,
  key = 'SECRET_KEY',
  iv = '9De0DgMTCDFGNokdEEial',
) => async dispatch => {
  try {
    // Get file from IPFS using hash
    const file = await getFile(hash).then(res => res[0].content);
    dispatch(ipfsGetFileAction(file));

    // Decrypt File
    const decryptedBuffer = await decryptFile(file, iv);
    dispatch(decryptFileAction(decryptedBuffer, fileName));

    // Trigger file download
    downloadFile(decryptedBuffer, fileName);
    dispatch(downloadFileAction());

  } catch (err) {
    console.log(err.message);
  }
};

// Decrypt File using DEK (iv)
export const decryptFile = async (encryptedBuffer, iv) => {
  console.log('decryptFile: Decrypting...');
  const decryptedBuffer = decrypt(encryptedBuffer, iv);
  console.log('decryptFile: Decrypted!', decryptedBuffer);
  return decryptedBuffer;
};

/*
******************
Helper Functions
******************
 */

// Helper fn - Get File from IPFS
const getFile = async hash => {
  console.log('getFile: Getting file from IPFS. Hash:', hash);

  try {
    const files = await node.files.get(hash);
    const res = files.map(file => {
      const { content, name, path } = file;
      return { content, name, path };
    });
    // Returns an array of length 1 containing an object with file details
    return res;
  } catch (err) {
    console.log('getFile:', err);
  }
};

// Helper fn - Download File from client to local machine
const downloadFile = (decryptedBuffer, fileName) => {
  return fileDownload(decryptedBuffer, fileName);
};

/*
******************
Action Creators
******************
 */

const decryptFileAction = (decryptedBuffer, fileName) => ({
  type: DECRYPT_FILE,
  payload: {
    decryptedBuffer,
    fileName,
  },
});

const ipfsGetFileAction = file => ({
  type: IPFS_GET_FILE,
  payload: file,
});

const downloadFileAction = () => ({
  type: DOWNLOAD_FILE,
});
