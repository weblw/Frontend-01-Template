import { parseHTML } from '../src/parser'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants'
const assert = require('assert')

it('parse a single element', () => {
  let doc = parseHTML('<div></div>')
  let div = doc.children[0]
  assert.equal(div.tagName, 'div')
  assert.equal(div.children.length, 0)
  assert.equal(div.type, 'element')
  assert.equal(div.attributes.length, 2)
})

it('parse a single element with text content', () => {
  let doc = parseHTML('<div>hello</div>')
  let text = doc.children[0].children[0]
  assert.equal(text.content, 'hello')
  assert.equal(text.type, 'text')
})

it('tag mismatch', () => {
  try {
    let doc = parseHTML('<div>hello</vid>')
  } catch(e) {
    assert.equal(e.message, "Tag start end doesn't match!")
  }
})

it('tag with <', () => {
  let doc = parseHTML('<div>a < b</div>')
  let text = doc.children[0].children[0]
  assert.equal(text.content, 'a < b')
  assert.equal(text.type, 'text')
})

it('tag with property', () => {
  let doc = parseHTML("<div id=a class='cls' data=\"abc\" ></div>")
  let div = doc.children[0]

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if(attr.name === 'class') {
      count++
      assert.equal(attr.value, "cls")
    }
    if(attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.equal(count, 3)
})

it('tag with property 2', () => { 
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"></div>")
  let div = doc.children[0]

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if(attr.name === 'class') {
      count++
      assert.equal(attr.value, "cls")
    }
    if(attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.equal(count, 3)
})

it('tag with property 3', () => { 
  let doc = parseHTML("<div id=a class='cls' data=\"abc\"/>")
  let div = doc.children[0]

  let count = 0

  for(let attr of div.attributes) {
    if(attr.name === 'id') {
      count++
      assert.equal(attr.value, 'a')
    }
    if(attr.name === 'class') {
      count++
      assert.equal(attr.value, "cls")
    }
    if(attr.name === 'data') {
      count++
      assert.equal(attr.value, 'abc')
    }
  }
  assert.equal(count, 3)
})

it('tag with script', () => { 
  let content = `
  <div>abc</div>
  <span>x</span>
  /script>
  <script
  <
  </
  </s
  </sc
  </scr
  </scri
  </scrip
  </script  
  `
  let doc = parseHTML(`<script>${content}</script>`)
  let script = doc.children[0].children[0]
  assert.equal(script.type, 'text')
  assert.equal(script.content, content)
})

it('attribute with no value', () => { 
  let doc = parseHTML("<div class />")
  console.log(doc.children[0])
})

it('attribute with no value 2', () => { 
  let doc = parseHTML("<div class id />")
  
})