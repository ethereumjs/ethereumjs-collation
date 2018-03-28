const tape = require('tape')
const utils = require('ethereumjs-util')
const Header = require('../header.js')
const Collation = require('../index.js')

tape('[Collation]: Header functions', function (t) {
  t.test('should create with default constructor', function (st) {
    function compareDefaultHeader (st, header) {
      st.deepEqual(header.shardId, utils.zeros(32), 'shardId should be equal')
      st.deepEqual(header.parentHash, utils.zeros(32), 'parentHash should be equal')
      st.equal(header.chunkRoot.toString('hex'), utils.SHA3_RLP_S, 'chunkRoot should be equal')
      st.deepEqual(header.period, utils.zeros(32), 'period should be equal')
      st.deepEqual(header.height, utils.zeros(32), 'height should be equal')
      st.deepEqual(header.proposerAddress, utils.zeros(32), 'proposerAddress should be equal')
      st.deepEqual(header.proposerBid, utils.zeros(32), 'proposerBid should be equal')
      st.deepEqual(header.proposerSignature, utils.zeros(96), 'proposerSignature should be equal')
    }

    var header = new Header()
    compareDefaultHeader(st, header)

    var collation = new Collation()
    header = collation.header
    compareDefaultHeader(st, header)

    st.end()
  })
})
