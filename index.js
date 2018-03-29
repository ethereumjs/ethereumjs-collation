const ethUtil = require('ethereumjs-util')
const rlp = ethUtil.rlp
const CollationHeader = require('./header')

/**
 * An object that represents a collation
 * @extends CollationHeader
 * @prop {Header} header the collation header
 */
class Collation extends CollationHeader {
  /**
   * @constructor
   * @param {Array|Buffer|Object} data the raw serialized or the deserialized collation
   */
  constructor (data) {
    // defaults
    if (!data) {
      data = [[], [], []]
    }

    if (Buffer.isBuffer(data)) {
      data = rlp.decode(data)
    }

    if (Array.isArray(data)) {
      super(data[0])
    } else {
      super(data.header)
    }
  }
}

module.exports = Collation
