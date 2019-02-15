const IPFS = require('ipfs');

const node = new IPFS({ emptyRepo: true });
node.on('start', async () => {
	console.log('IPFS Node Started...');
});

node.on('ready', async () => {
	const version = await node.version();
	const id = await node.id();
	console.log(`IPFS Node Ready:
    Version: ${version.version}
    Node Id: ${id.id}
  `);
	console.log(node);
});

export default node;
