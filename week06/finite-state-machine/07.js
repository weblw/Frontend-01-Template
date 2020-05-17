function match(pattern, string) {
  let state = start
  for (let c of string) {
    state = state(c, pattern)
  }
  return state === end
}

function start(c, pattern) {
  if (c === pattern.charAt(0)) {
    return next
  } else {
    return start
  }
}

function end(c) {
  return end
}

function next(c, pattern) {
  if (c === pattern.charAt(1)) {
    return next1
  } else {
    return start(c, pattern)
  }
}

function next1(c, pattern) {
  if (c === pattern.charAt(2)) {
    return next2
  } else {
    return next(c, pattern)
  }
}

function next2(c, pattern) {
  if (c === pattern.charAt(2)) {
    return end
  } else {
    return next1(c, pattern)
  }
}

console.log(match('abcd', 'aaaabbbbcccd'))