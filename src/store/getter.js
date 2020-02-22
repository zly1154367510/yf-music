
const getter = {
    getTopPlayList: state => {
        return state.topPlayList
    },
    getMusicData: state => {
        return state.musicData
    },
    getMusicListData: state => {
        return state.musicListData
    },
    getLyric: state => state.lyric
}

export default getter
