const path = require('path');
const CryptoJS = require('crypto-js');

const key = 'SECRET_KEY';
const iv = '9De0DgMTCDFGNokdEEial'; // Default ; You must dynamically create

// Input : Data Buffer
// Output: Encrypted Buffer, iv
const encrypt = dataBuffer => {
  const dataBase64 = dataBuffer.toString('base64');
  const iv = _generateIv();
  const encryptFile = CryptoJS.AES.encrypt(dataBase64, key, {
    iv,
  });
  const encryptedBuffer = new Buffer(encryptFile.toString(), 'base64');
  return { encryptedBuffer, iv };
};

// Input: Encrypted Buffer
// Output : Decrypted Data Buffer
const decrypt = (encryptedBuffer, iv) => {
  const decryptFile = CryptoJS.AES.decrypt(
    encryptedBuffer.toString('base64'),
    key,
    { iv },
  );
  const decrypted = decryptFile.toString(CryptoJS.enc.Utf8);

  const outputBuffer = new Buffer(decrypted.toString(), 'base64');
  return outputBuffer;
};

const _generateIv = () => CryptoJS.lib.WordArray.random(128 / 8);


export { encrypt, decrypt };
