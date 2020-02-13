import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 提供全局共享数据
        isLogin: false,
        token: '',
        userId: 0,
        musicList: [],
        musicData: false
    },
    mutations: {
        loginStatus (state, status) {
            // mutate state
            state.isLogin = status
        },
        setToken (state, token) {
            // mutate state
            state.token = token
        },
        setUserId (state, userId) {
            state.userId = userId
        },
        setMusicList (state, data) {
            state.musicList = data
        },
        clearMusicList (state) {
            state.musicList = []
        },
        setMusicData (state, data) {
            state.musicData = data
        }
    },
    actions: {
    },
    modules: {
    }
})