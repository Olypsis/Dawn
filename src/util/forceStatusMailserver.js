import StatusJS from 'status-js-api';
// const StatusJS = require('status-js-api');
import isEmpty from './is-empty';

const forceMailserverQuery = async (privateKey, enode, provider) => {
  let status = new StatusJS();
  let mailserver = !isEmpty(enode)
    ? enode
    : 'enode://7aa648d6e855950b2e3d3bf220c496e0cae4adfddef3e1e6062e6b177aec93bc6cdcf1282cb40d1656932ebfdd565729da440368d7c4da7dbd4d004b1ac02bf8@206.189.243.169:443';
  let statusProvider = !isEmpty(provider)
    ? provider
    : 'http://35.188.163.32:8545';

  await status.connect(statusProvider, privateKey.slice(0, 66));

  console.log(await status.getPublicKey());

  status.onMessage((err, data) => {
    if (err) console.log('forceStatusMailserver: ERR:' + data.payload);
    if (data)
      console.log('forceStatusMailserver: PrivMessage: ' + data.payload);
  });

  // mail-02.gc-us-central1-a.eth.beta
  status.mailservers.useMailserver(mailserver, (err, res) => {
    // Group chats
    let from = parseInt(new Date().getTime() / 1000 - 86400, 10);
    let to = parseInt(new Date().getTime() / 1000, 10);

    // User messages
    status.mailservers.requestUserMessages({ from, to }, (err, res) => {
      if (err) console.log(err);
      console.log('forceStatusMailserver: requested messages');
    });
  });
};

export default forceMailserverQuery;
