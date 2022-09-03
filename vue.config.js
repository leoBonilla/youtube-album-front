const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://5g094irhc7.execute-api.us-east-1.amazonaws.com/',
    allowedHosts: 'all',
}
})
