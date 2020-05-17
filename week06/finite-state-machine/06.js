function match(string) {
  let state = start
  for (let c of string) {
    state = state(c)
  }
  return state === end
}

function start(c) {
  if (c === 'a') {
    return foundA
  } else {
    return start
  }
}

function end(c) {
  return end
}

function foundA(c) {
  if (c === 'b') {
    return foundX
  } else
    return start(c)
}

function foundX(c) {
  if (c === 'x')
    return end
  else
    return foundA(c)
}

console.log(match('abababx'))