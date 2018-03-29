const assert = require('assert')
const utils = require('ethereumjs-util')

/**
 * An object that represents the collation header
 * @prop {Buffer} shardId Identifier for the shard
 * @prop {Buffer} parentHash Hash of the collation's parent
 * @prop {Buffer} chunkRoot The root hash of the chunk tree
 * @prop {Buffer} period Collation tree extension period
 * @prop {Buffer} height Height of collation in collation tree
 * @prop {Buffer} proposerAddress The proposer's address
 * @prop {Buffer} proposerBid Bid of the proposer
 * @prop {Buffer} proposerSignature Signature of the proposer
 */
class CollationHeader {
  /**
   * @constructor
   * @param {Array} data raw data, deserialized
   */
  constructor (data) {
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

    assert(this.shardNumber() >= 0 && this.shardNumber() < 100) // TODO: replace with SHARD_COUNT from util lib
  }

  /**
   * Returns the network Id of the collation
   * @method networkId
   * @return {int}
   */
  networkId () {
    return utils.bufferToInt(this.shardId.slice(0, 1))
  }

  /**
   * Returns the shard number of the collation
   * @method shardNumber
   * @return {int}
   */
  shardNumber () {
    return utils.bufferToInt(this.shardId.slice(-1))
  }

  /**
   * Returns the keccak-256 hash of the collation header
   * @method hash
   * @return {Buffer}
   */
  hash () {
    return utils.sha3(this.raw)
  }
}

module.exports = CollationHeader
