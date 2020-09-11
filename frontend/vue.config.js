module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      scss: {
        data: ` 
          @import "@/assets/scss/fontiran.scss";
        `
      }
    }
  },
  configureWebpack: {
    //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
    resolve: {
       symlinks: false
    },
    externals: {
      // global app config object
      config: JSON.stringify({
          apiUrl: 'http://localhost:3001'
      })
  }
  },
  transpileDependencies: [
    '@coreui/utils'
  ]
}
