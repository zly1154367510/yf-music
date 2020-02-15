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
        musicData: false,
        musicListData: [],
        playMusicListData: [],
        loading: false
    },
    mutations: {
        clearLoginStatus (state) {
            state.isLogin = false
            state.userId = 0
            // state.musicList = []
            // state.musicData = false
            state.musicListData = []
            state.playMusicListData = []
        },
        setPlayMusicListData (state, data) {
            state.playMusicListData = data
        },
        setMusicListData (state, data) {
            state.musicListData = data
        },
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
        },
        setLoading (state, data) {
            state.loading = data
        }
    },
    actions: {
    },
    modules: {
    }
})
