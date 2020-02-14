import Vue from 'vue'
import axios from 'axios'
import store from './../store'
axios.defaults.baseURL = 'http://106.12.138.179:3000'
axios.defaults.withCredentials = true
var loginUrl = [
    '/user/playlist'
]
axios.interceptors.request.use(config => {
    // axios请求拦截器,用以配置请求头等信息
    store.commit('setLoading', true)
    if (store.state.isLogin === false && loginUrl.includes(config.url.split('?')[0])) {
        return ''
    } else {
        return config
    }
})
axios.interceptors.response.use(config => {
    store.commit('setLoading', false)
    return config
}, function (err) {
    if (err.response) {
        var code = err.response.status
        if (code === 400) {
            // console.log('code:' + code + '请求参数错误')
            return err.response
        } else if (code === 404) {
            if (err.response.data.success === false) {
                return err.response
            }
        } else if (code === 301) {
            // console.log('code:' + code + '需要登录请求')
            return err.response
        } else {
            return err.response
            // console.log('code:' + code + '请求错误')
        }
    }
})
Vue.prototype.$http = axios
Vue.prototype.requestResMessage = function (data, success, error) {
    if (data.code === 200) {
        if (success !== false) {
            this.$message(success)
        }
        return true
    } else {
        this.$message(error)
        return false
    }
}
