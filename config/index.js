'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

var path = require('path')

var proxyUrl = 'http://10.10.136.57:5050';
// var proxyUrl = 'http://10.10.136.214:8080';//姚
// var proxyUrl = 'http://10.10.136.215:8080';//朱贺
module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/credit-data-platform':{
            target: proxyUrl,
            changeOrigin: true,
        },
        '/jd-framework-service':{
            target: proxyUrl,
            changeOrigin: true,
        },
        '/credit-data-lhjc':{
            target: proxyUrl,
            changeOrigin: true,
        },
        '/credit-data-xypj':{
            target: proxyUrl,
            changeOrigin: true,
        },
        // 网站文章接口
        '/api':{
            target: 'http://221.226.147.58:84',
            changeOrigin: true,
        },
        // 红黑榜 双公示接口
        '/oneSearchAct':{
            target: 'http://221.226.147.58:84',
            changeOrigin: true,
        }
    },

    // Various Dev Server settings
    host: '10.10.136.194', // can be overwritten by process.env.HOST
    port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
