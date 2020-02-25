import axios from 'axios'
// import Vue from 'vue'
const axiosList = {
    getTopPlayList: (topPlayListCount) => {
        if (topPlayListCount === undefined) {
            topPlayListCount = 18
        }
        return axios.get(`top/playlist/highquality?limit=${topPlayListCount}`)
    },
    getRecommendPlayList: () => {
        return axios.get('/recommend/resource')
    },
    getRecommendMusic: () => {
        return axios.get('/recommend/songs')
    },
    getPersonalFm: () => {
        return axios.get('/personal_fm')
    },
    getPlayUrl: (id) => {
        return axios.get('/song/url?id=' + id)
    },
    getLyric: (id) => {
        return axios.get('/lyric?id=' + id)
    },
    getHotComment: (id, limit = 10, type = 0) => {
        return axios.get(`/comment/hot?id=${id}&limit=${limit}&type=${type}`)
    },
    likeUp: (id, cId, t = 1, type = 0) => {
        return axios.get(`/comment/like?id=${id}&cid=${cId}&t=${t}&type=${type}`)
    }
}
export default axiosList
