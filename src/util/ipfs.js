const IPFS = require('ipfs');
const PeerId = require('peer-id');

const node = new IPFS({ emptyRepo: true });

node.on('start', async () => {
  console.log('IPFS Node Started...');
  // console.log("IPFS IN THE BUILDING!");
});

node.on('ready', async () => {
  const version = await node.version();
  const id = await node.id();
  console.log(`IPFS Node Ready:
    Version: ${version.version}
    Node Id: ${id.id}
  `);
});

export default node;
