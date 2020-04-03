// vue.config.js
module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  // baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://192.168.1.126:7366/api',
        // target: 'http://192.168.1.23:8360/api',
        // target: 'http://192.168.1.194:7366/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
