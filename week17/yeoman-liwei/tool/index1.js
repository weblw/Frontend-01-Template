var tty = require('tty')
var ttys = require('ttys')
var readline = require('readline')
const { stdout } = require('process')

/*
stdout.write('hello word!\n')
stdout.write('\033[1A')// 上移光标
stdout.write('liwei\n')
*/

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function ask(question) {
  return new Promise((resolve,reject) => {
    rl.question(question, answer => {
      resolve(answer)
    })
  })
}

void async function() {
  console.log(await ask('your project name?'))
  rl.close()
}();
