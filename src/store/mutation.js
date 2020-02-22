import types from './mutation_type.js'
var mutations = {
    [types.SET_TOP_PLAY] (state, data) {
        state.topPlayList = data
    },
    [types.SET_MUSIC_LIST_DATA] (state, data) {
        state.musicListData = data
    },
    [types.SET_LYRIC] (state, data) {
        state.lyric = data
    },
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
}

export default mutations
