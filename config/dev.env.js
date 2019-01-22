'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://192.168.2.53/webview-server"',
  BASE_API: '"http://192.168.2.54/webview-server"',
  // BASE_API: '"http://192.168.2.151:8080/webviewserver"',
})
