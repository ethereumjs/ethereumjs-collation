const utils = require('ethereumjs-util')

/**
   * An object that represents the collation header
   * @constructor
   * @param {Array} data raw data, deserialized
   * @prop {Buffer} shardId Identifier for the shard
   * @prop {Buffer} parentHash Hash of the collation's parent
   * @prop {Buffer} chunkRoot The root hash of the chunk tree
   * @prop {Buffer} period Collation tree extension period
   * @prop {Buffer} height Height of collation in collation tree
   * @prop {Buffer} proposerAddress The proposer's address
   * @prop {Buffer} proposerBid Bid of the proposer
   * @prop {Buffer} proposerSignature Signature of the proposer
   */
var CollationHeader = module.exports = function (data) {
  // TODO: Someone should cross-check default and length values here (also the
  // ones left out) and remove this comment if confident that these are correct
  // One basic assumption is that all fields are fixed-sized to 32 bytes,
  // taken from discussion on Py-EVM implementation here:
  // https://github.com/ethereum/py-evm/pull/462/files
  var fields = [{
    name: 'shardId',
    length: 32,
    default: utils.zeros(32)
  }, {
    name: 'parentHash',
    length: 32,
    default: utils.zeros(32)
  }, {
    name: 'chunkRoot',
    length: 32,
    default: utils.SHA3_RLP
  }, {
    name: 'period',
    length: 32,
    default: utils.zeros(32)
  }, {
    name: 'height',
    length: 32,
    default: utils.zeros(32)
  }, {
    name: 'proposerAddress',
    length: 32,
    default: utils.zeros(32)
  }, {
    name: 'proposerBid',
    length: 32,
    default: utils.zeros(32)
  }, {
    name: 'proposerSignature',
    length: 96,
    default: utils.zeros(96)
  }
  ]
  utils.defineProperties(this, fields, data)
}

/**
 * Returns the keccak-256 hash of the collation header
 * @method hash
 * @return {Buffer}
 */
CollationHeader.prototype.hash = function () {
  return utils.sha3(this.raw)
}
