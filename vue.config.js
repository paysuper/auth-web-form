const path = require('path')
// const IS_AUTH = Boolean(process.env.AUTH)

module.exports = {
  lintOnSave: false,

  css: {
    extract: false,
    loaderOptions: {
      stylus: {
        import: [
          path.resolve(__dirname, 'src/styl/variables.styl'),
          path.resolve(__dirname, 'src/styl/mixins.styl')
        ]
      }
    }
  },

  chainWebpack: cfg => {

  },

  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  }
}
