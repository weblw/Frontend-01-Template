// 浏览器端完成 publish_tool
let url = `https://github.com/login/oauth/authorize?
           client_id=Iv1.61c3525df02b4396&
           redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&
           scope=read%3Auser&
           state=123abc`
// 服务器端完成 publish_server
{
  let client_id = 'Iv1.61c3525df02b4396'
  let client_secret = '11a3b06c4fd29fc56ee3ae022144f14a8c1391ff'
  let redirect_uri = 'http%3A%2F%2Flocalhost%3A3000%2F&'
  let scope = 'read%3Auser'
  let code = 'b862ea77236e17e0bb93'
  let state = '123abc'
  let params = `code=${code}&state=${state}&client_secret=${client_secret}&client_id=${client_id}&redirect_uri=${redirect_uri}`
  let xhr = new XMLHttpRequest()
  xhr.open('POST', `https://github.com/login/oauth/access_token?${params}`, true)
  xhr.send(null)
  xhr.addEventListener('readystatechange', function() {
    if(xhr.readyState === 4) {
      console.log(xhr.responseText)
    }
  })
}
// 客户端、服务端都可以 publish_tool/publish_server
{
  let token = '1afe92f5cfee6ec24b477bcc9ab827861c0781a6'
  let xhr = new XMLHttpRequest()
  xhr.open('GET', `https://api.github.com/user`, true)
  xhr.setRequestHeader('Authorization', `token ${token}`)
  xhr.send(null)
  xhr.addEventListener('readystatechange', function() {
    if(xhr.readyState === 4) {
      console.log(xhr.responseText)
    }
  })
}