function match(string) {
  for (let c of string) {
    if (c === 'a') {
      return true
    }
  }
  return false
}

let ret = match('I am groot!')
console.log(ret)