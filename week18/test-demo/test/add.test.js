// const testFn =  require('../dist/add.js')
import { add } from '../src/add.js'
const assert = require('assert')

describe('add', function() {
  it('add(3, 4) should be 7', function() {
    assert.equal(add(3, 4), 7)
  })
})

// test('foo', t => {
//   if(testFn.add(3, 4) === 7)
//     t.pass()
// })