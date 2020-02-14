import Vue from 'vue'
// 播放音乐 row 当前行数据
const playLineMusic = async function (row) {
    // 检查音乐是否可用
    const { data: checkMusicRes } = await this.$http.get('/check/music?id=' + row.id)
    if (checkMusicRes.success) {
        const { data: playMusicUrlRes } = await this.$http.get('/song/url?id=' + row.id)
        this.$store.commit('setMusicData', {
            title: row.name,
            artist: row.name,
            src: playMusicUrlRes.data[0].url
            // pic: row.al.picUrl ? row.al.picUrl
        })
    } else {
        this.$message(checkMusicRes.message)
    }
}

const buildPlayMusicList = function (res) {
    var musicList = []
    for (var item in res) {
        musicList.push({
            title: res[item].name,
            artist: res[item].name,
            src: res[item].playUrl
            // pic: res[item].al.picUrl
        })
    }
    this.$store.commit('setPlayMusicListData', musicList)
}

// 通过音乐数组来获取音乐的播放url
const getPlayURL = async function (musicList) {
    var playUrlRequestParams = ''
    for (var item in musicList) {
        if (item !== '0') {
            playUrlRequestParams += ','
        }
        playUrlRequestParams += musicList[item].id
    }
    const { data: tempPlayUrlRes } = await this.$http.get('/song/url?id=' + playUrlRequestParams + '&br=999000')
    var playUrl = []
    for (var urlItem in tempPlayUrlRes.data) {
        // 创建播放地址数列hashmap表
        playUrl[tempPlayUrlRes.data[urlItem]['id']] = tempPlayUrlRes.data[urlItem]['url']
    }
    for (var tracksItem in musicList) {
        musicList[tracksItem]['playUrl'] = playUrl[musicList[tracksItem]['id']]
    }
    return musicList
}

Vue.prototype.getPlayURL = getPlayURL
Vue.prototype.playLineMusic = playLineMusic
Vue.prototype.buildPlayMusicList = buildPlayMusicList
