const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

/**
 * check production or preview(pro.loacg.com only)
 * @returns {boolean}
 */
function isProd() {
  return process.env.NODE_ENV === 'production'
}

const assetsCDN = {
  css: [
    // '//cdn.jsdelivr.net/npm/medium-editor@latest/dist/css/medium-editor.min.css'
  ],
  // https://unpkg.com/browse/vue@2.6.10/
  js: [
    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
    '//cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js',
    '//cdn.jsdelivr.net/npm/vuex@3.4.0/dist/vuex.min.js',
    '//cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
    // '//cdn.jsdelivr.net/npm/medium-editor@latest/dist/js/medium-editor.min.js'
  ]
}
// webpack build externals
const prodExternals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios'
}
// vue.config.js
const vueConfig = {
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    // if prod is on, add externals
    externals: isProd() ? prodExternals : {}
  },

  chainWebpack: (config) => {
    config.resolve.alias
        .set('@$', resolve('src'))

    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
        .test(/\.svg$/)
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    // if prod is on
    // assets require on cdn
    if (isProd()) {
      config.plugin('html').tap(args => {
        args[0].cdn = assetsCDN
        return args
      })
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    // development server port 8000
    disableHostCheck: true,
    proxy: {
      '/auth': {
        target: process.env.VUE_APP_API_BASE_URL,
        ws: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },
      '/admin': {
        target: process.env.VUE_APP_API_BASE_URL,
        ws: true,
        pathRewrite: {
          '^/admin': '/admin'
        }
      },
      '/code': {
        target: process.env.VUE_APP_API_BASE_URL,
        ws: true,
        pathRewrite: {
          '^/code': '/code'
        }
      },
      '/story': {
        target: process.env.VUE_APP_API_BASE_URL,
        ws: true,
        pathRewrite: {
          '^/story': '/story'
        }
      },
    }
  },
  // disable source map in production
  productionSourceMap: false,
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: []
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  console.log('VUE_APP_PREVIEW', true)
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
