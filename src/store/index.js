import Vue from 'vue'
import Vuex from 'vuex'
import actions from './action.js'
import mutations from './mutation.js'
import getter from './getter.js'
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
        loading: false,
        // 精品歌单
        topPlayList: []
    },
    mutations: mutations,
    actions: actions,
    getters: getter,
    modules: {
    }
})
