const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'http://95.111.200.201:8081',
    client: {
      overlay: false,
    },
  }
})
