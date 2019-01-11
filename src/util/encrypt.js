const CryptoJS = require('crypto-js');

const generateIv = () => CryptoJS.lib.WordArray.random(128 / 8);
const generateKey = () =>
  CryptoJS.enc.Base64.stringify(CryptoJS.lib.WordArray.random(128 / 8));

// Input : Data Buffer
// Output: Encrypted Buffer, iv
const encrypt = dataBuffer =>
  new Promise((resolve, reject) => {
    try {
      const dataBase64 = dataBuffer.toString('base64');
      const iv = generateIv();
      const key = generateKey();
      console.log('encrypt: Key/IV', key, iv);
      const encryptFile = CryptoJS.AES.encrypt(dataBase64, key);
      const encryptedBuffer = new Buffer(encryptFile.toString(), 'base64');
      resolve({ encryptedBuffer, iv, key });
    } catch (err) {
      reject(err);
    }
  });

// Input: Encrypted Buffer
// Output : Decrypted Data Buffer
const decrypt = (encryptedBuffer, key, iv) =>
  new Promise((resolve, reject) => {
    try {
      console.log('decrypt: decrypting file with key:', key);
      const decryptFile = CryptoJS.AES.decrypt(
        encryptedBuffer.toString('base64'),
        key,
        // { iv },
      );
      const decrypted = decryptFile.toString(CryptoJS.enc.Utf8);

      const outputBuffer = new Buffer(decrypted.toString(), 'base64');
      resolve(outputBuffer);
    } catch (err) {
      reject(err);
    }
  });

export { encrypt, decrypt };
