function* g() {
  yield 1
  yield 2
  yield 3
}

for (let v of g()) {
  console.log(v)
}

function sleep(t) {
  return new Promise(resolve => {
    setTimeout(resolve, t)
  })
}

async function* h() {
  let i = 0
  while (true) {
    await sleep(1000)
    yield i++
  }
}

for await (let v of h()) {
  console.log(v)
}