import 'whatwg-fetch'
import Vue from 'vue'
import qs from 'qs'
const prefix = process.env.NODE_ENV == 'production'
  ? ''
  : '/api'

export default {
  get (url, query) {
    // Vue.prototype.$Progress.start()
    return fetch(queryParser(prefix+url, query), config._get)
      .then(checkStatus)
      .then(jsonParser)
      .then(checkSuccess)
  },
  post (url, body, service_name) {
    // Vue.prototype.$Progress.start()
    return fetch(prefix+url, config._post(body))
      .then(checkStatus)
      .then(jsonParser)
      .then(checkSuccess)
  } 
}

const config = {
  _get: {
    credentials: 'include'
  },
  _post (body) {
    if (!body) {
      body = ''
    } else if (typeof body !== 'string') { 
      // convert to formData
      body = qs.stringify(body)
    }

    return Object.assign({}, this._get, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    })
  }
}

const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    Vue.prototype.$Progress.finish()
    return response
  } else {
    Vue.prototype.$Progress.fail()
    var error = new Error(response.statusText)
    error.response = response
    error.message = '服务开小差儿啦，请稍后再试'
    throw error
  }
}

const jsonParser = function (response) {
  return response.json()
}

const queryParser = function (url, query) {
  if (!query) return url
  let parsedQuery = Object.keys(query).map(key => {
    let val = typeof query[key] == 'object' ? JSON.stringify(query[key]) : query[key]
    return (`${key}=${val}`)
  }).join('&')

  return `${url}?${parsedQuery}`
}

const checkSuccess = function (parsed) {
  if(!parsed.error) return parsed
  else {
    if(parsed.error == 3000) {
      Vue.prototype.$confirm('前往登录页面重新登录', '登录超时', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let signinHref = process.env == 'production'
          ? '/system/passport/signin'
          : 'http://oa.kaikela.dev/system/passport/signin'
        window.location.href = signinHref
      }).catch(() => {
      })
    } else { 
      var error = new Error(parsed.code)
      error.message = parsed.message || parsed.msg
      throw error
      return ;
    }
  }
}