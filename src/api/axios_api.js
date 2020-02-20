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
    }
}
export default axiosList
