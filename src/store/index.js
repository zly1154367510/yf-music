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
        // 当前播放歌曲
        musicData: false,
        // 播放列表
        musicListData: [],
        playMusicListData: [],
        loading: false,
        // 精品歌单
        topPlayList: [],
        // 当前播放歌曲的歌词
        lyric: false
    },
    mutations: mutations,
    actions: actions,
    getters: getter,
    modules: {
    }
})
