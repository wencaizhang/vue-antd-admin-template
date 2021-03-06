const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  configureWebpack: {

  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          /* less 变量覆盖，用于自定义 ant design 主题 */

          'primary-color': '#5184f6',
          /*
          'primary-color': '#F5222D',
          'link-color': '#F5222D',
          'border-radius-base': '4px',
          */
        },
        javascriptEnabled: true,
      }
    }
  },
  devServer: {
    proxy: {
      '/cmp': {
        target: 'http://ci.cmp.cecpark.net',
        // target: 'http://192.168.150.130:8081',
        ws: false,
        changeOrigin: true,
        // pathRewrite: {
        //   'demo': ''
        // }
      },
    }
  }
}
