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

// const outputFileAsync = (data, fileExt) => {
//   writeFile(`out/unencrypted${fileExt}`, data)
//     .then(() => console.log('The file was saved!'))
//     .catch(error => console.log(error));
// };

// Main loop
async function main() {
  // Get Filepath / Filetype
  // // Read data as Buffer from filepath
  // const dataBuffer = await readFileAsync(filePath);
  //
  // // Encrypt data
  // const encrypted = encrypt(dataBuffer);
  //
  // // Decrypt Data
  // const decrypted = decrypt(encrypted);
  //
  // // Convert decrypted data to Buffer
  // const outputBuffer = new Buffer(decrypted.toString(), 'base64');
  //
  // // Write file to filesystem
  // outputFileAsync(outputBuffer, fileType);
  //
  // // ~~~ Logging ~~~ //
  // // Log Pre-Encryption data
  // console.log('PRE-ENCRYPT BUFFER: ', inputBuffer, typeof inputBuffer);
  // // console.log('PRE-ENCRYPT BUFFER BASE 64: ', inputBuffer64, typeof inputBuffer64);
  //
  // // Log Encrypted data
  // // console.log('ENCRYPTED BUFFER: ', encrypted, typeof encrypted);
  //
  // // Log Post-Decryption data
  // // console.log('DECRYPTED BUFFER BASE 64: ', decrypted, typeof decrypted);
  // console.log('DECRYPTED BUFFER: ', outputBuffer, typeof outputBuffer);
  // console.log('BASE64 MATCH: ', inputBuffer64 === decrypted);
  // console.log('BUFFER MATCH: ', inputBuffer === outputBuffer);
  // // ~~~ End Logging ~~~ //
}
// main();

export { encrypt, decrypt };
