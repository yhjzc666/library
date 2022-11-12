const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: 'http://localhost:8081/',
        // 允许跨域
        changeOrigin: true,
        secure: false,  // 如果是https接口，需要配置这个参数
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
