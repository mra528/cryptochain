const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

describe('Block', () => {
   const timestamp = 'a-date';
   const lastHash = "foo-hash";
   const hash = "bar-hash";
   const data = ["blockchain", "data"];
   const block = new Block({
       timestamp,
       lastHash,
       hash,
       data
   });

   it('has a time stamp, lashHash, hash, and data property', () => {
       expect(block.timestamp).toEqual(timestamp);
       expect(block.lastHash).toEqual(lastHash);
       expect(block.data).toEqual(data);
       expect(block.hash).toEqual(hash);
   });

   describe('genesis()', () => {
      const genesisBlock = Block.genesis();

      console.log('genesisBlock', genesisBlock);

      it('returns a Block instsnce', () => {
          expect(genesisBlock instanceof Block).toBe(true);
      });

      it('returns the gensis data', () => {
          expect(genesisBlock).toEqual(GENESIS_DATA);
      })
   });

   describe('mineBlock()', () => {
       const lastBlock =  Block.genesis();
       const data = 'mined data';
       const minedBlock = Block.minedBlock({ lastBlock, data });

       it('returns a Block instance', () => {
           expect(minedBlock instanceof Block).toBe(true);
       });

       it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
           expect(minedBlock.lastHash).toEqual(lastBlock.hash);
       });

       it('sets the `data`', () => {
           expect(minedBlock.data).toEqual(data);
       });

       it('sets a `timestamp`', () => {
           expect(minedBlock.timestamp).not.toEqual(undefined);
       });

       it('creates a SHA-256 `hash` based on the proper inputs', () => {
           expect(minedBlock.hash)
               .toEqual(cryptoHash(minedBlock.timestamp, lastBlock.hash, data));
       });
   })
});