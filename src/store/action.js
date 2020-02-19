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
    }
}

export default actions
