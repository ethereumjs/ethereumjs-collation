const ethUtil = require('ethereumjs-util')
const rlp = ethUtil.rlp
const CollationHeader = require('./header')

/**
 * Creates a new collation object
 * @constructor the raw serialized or the deserialized collation.
 * @param {Array|Buffer|Object} data
 * @prop {Header} header the collation header
 */
var Collation = module.exports = function (data) {
  Object.defineProperty(this, 'raw', {
    get: function () {
      return this.serialize(false)
    }
  })

  // defaults
  if (!data) {
    data = [[], [], []]
  }

  if (Buffer.isBuffer(data)) {
    data = rlp.decode(data)
  }

  if (Array.isArray(data)) {
    this.header = new CollationHeader(data[0])
  } else {
    this.header = new CollationHeader(data.header)
  }
}

/**
 * Produces a hash of the collation header
 * @method hash
 */
Collation.prototype.hash = function () {
  return this.header.hash()
}
