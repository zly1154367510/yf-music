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
    }
}
export default axiosList
