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
            src: playMusicUrlRes.data[0].url,
            id: row.id
            // pic: row.al ? row.al.picUrl : row.artists.picUrl
        })
    } else {
        this.$message(checkMusicRes.message)
    }
}

// 把接口获取的歌曲信息转换成播放器的数据格式
const buildPlayMusicList = function () {
    var res = this.$store.state.musicListData
    // console.log(res)
    var musicList = []
    console.log(res)
    for (var item in res) {
        if (res[item].playUrl !== null) {
            musicList.push({
                title: res[item].name,
                artist: res[item].name,
                src: res[item].playUrl,
                id: res[item].id
                // pic: res[item].al.pic
            })
        }
    }
    this.$store.commit('setPlayMusicListData', musicList)
}

// 转换歌单中歌手artists元素下标为ar
const artistsToAr = function (list) {
    for (var index in list) {
        list[index]['ar'] = list[index]['artists']
    }
    return list
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
const playMusic = function (row) {
    this.buildPlayMusicList()
    this.playLineMusic(row)
}

const minuteToSecond = function (data) {
    var tempRes = data.split(':')
    var res = parseInt(tempRes[0]) * 60 + parseInt(tempRes[1])
    return res
}
const getWeek = function () {
    var a = ['日', '一', '二', '三', '四', '五', '六']
    var week = new Date().getDay()
    return a[week]
}
Vue.prototype.commonPlatMusic = playMusic
Vue.prototype.tableFields = [
    { label: '操作', width: 180, is_defined: 'OperationButton' },
    { prop: 'name', 'label': '歌名', 'width': 900 },
    { prop: 'ar', 'label': '歌手', 'width': 400, type: 'array', arrayIndex: ['ar'] }
]
Vue.prototype.getPlayURL = getPlayURL
Vue.prototype.playLineMusic = playLineMusic
Vue.prototype.buildPlayMusicList = buildPlayMusicList
Vue.prototype.getWeek = getWeek
Vue.prototype.minuteToSecond = minuteToSecond
Vue.prototype.artistsToAr = artistsToAr
Vue.prototype.types = {
    SET_TOP_PLAY: 'SET_TOP_PLAY',

    SET_NEWSONG: 'SET_NEWSONG',

    SET_SONGLIST: 'SET_SONGLIST',

    SET_HOTWORD: 'SET_HOTWORD',

    SET_SEARCH: 'SET_SEARCH',

    SET_PLAYURL: 'SET_PLAYURL',

    SET_LISTDETAIL: 'SET_LISTDETAIL'
}
