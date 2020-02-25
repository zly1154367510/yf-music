import axiosList from './../api/axios_api.js'
import types from './mutation_type.js'
// import * as type from './mutation-type'

const actions = {
    topPlay: ({ commit }, length) => {
        return new Promise((resolve, reject) => {
            axiosList.getTopPlayList(length).then(res => {
                var topPlayList = []
                var tempPlayBlock = []
                for (var item in res.data.playlists) {
                    if (tempPlayBlock.length < 6) {
                        tempPlayBlock.push(res.data.playlists[item])
                    } else {
                        topPlayList.push(tempPlayBlock)
                        tempPlayBlock = []
                    }
                }
                commit(types.SET_TOP_PLAY, topPlayList)
                resolve()
            }).catch(res => {
                reject(res)
            })
        })
    },
    musicListData: ({ commit }, res) => {
        commit(types.SET_MUSIC_LIST_DATA, res)
    },
    musicData: ({ commit }, res) => {
        commit(types.SET_MUSIC_DATA, res)
    },
    hotComment: ({commit}, params) => {
        return new Promise((resolve, reject) => {
            axiosList.getHotComment(params.id, params.limit).then(res => {
                if (res.data.code === 200) {
                    commit(types.SET_HOT_COMMENT, res.data.hotComments)
                    resolve()
                } else {
                    reject(res)
                }
            }).catch(res => {
                reject(res)
            })
        })
    },
    vlyric: ({ commit }, id) => {
        return new Promise((resolve, reject) => {
            axiosList.getLyric(id).then(res => {
                var tempLyrci = res.data.lrc.lyric.split('[')
                var lyrci = []
                var tempLyrciItem = []
                for (var index in tempLyrci) {
                    tempLyrciItem = tempLyrci[index].split(']')
                    lyrci[tempLyrciItem[0]] = tempLyrciItem[1]
                }
                commit(types.SET_LYRIC, lyrci)
            }).catch(error => {
                console.log(error)
            })
        })
    }
}

export default actions
