<template>
    <div>
        <div class="header">
            <img :src="playListDetail.coverImgUrl">
            <span>{{playListDetail.name}}</span>
        </div>
        <div class="table">
            <base-table
            :tableFields="tableFields"
            :value="playListDetail.tracks"
             @rowClick='playMusic'>
             </base-table>
        </div>
    </div>
</template>

<script>
import BaseTable from './base/BaseTable'
export default {
    name: '',
    components: {
        BaseTable
    },
    mounted () {
        this.getPlayListDetail()
    },
    props: {},
    watch: {
        // 监听url栏的参数变化 如果变化了则刷新数据
        '$route' (to, from) {
            this.getPlayListDetail()
        }
    },
    data () {
        return {
            playListDetail: {},
            tableFields: [
                { prop: 'name', 'label': '歌名', 'width': 900 },
                { prop: 'ar', 'label': '歌手', 'width': 400, type: 'array', arrayIndex: ['ar'] }
                // { prop: '3', 'label': '专辑', 'width': 200 }
            ]
        }
    },
    methods: {
        playMusic: async function (row) {
            // 检查音乐是否可用
            const { data: checkMusicRes } = await this.$http.get('/check/music?id=' + row.id)
            if (checkMusicRes.success) {
                const { data: playMusicUrlRes } = await this.$http.get('/song/url?id=' + row.id)
                this.$store.commit('setMusicData', {
                    title: row.name,
                    artist: row.name,
                    src: playMusicUrlRes.data[0].url,
                    pic: row.al.picUrl
                })
                var musicList = []
                for (var item in this.playListDetail.tracks) {
                    if (this.playListDetail.tracks[item].playUrl === null) {
                        continue
                    }
                    musicList.push({
                        title: this.playListDetail.tracks[item].name,
                        artist: this.playListDetail.tracks[item].name,
                        src: this.playListDetail.tracks[item].playUrl,
                        pic: this.playListDetail.tracks[item].al.picUrl
                    })
                }
                console.log(musicList)
                this.$store.commit('setMusicList', musicList)
            } else {
                this.$message(checkMusicRes.message)
            }
        },
        getPlayListDetail: async function () {
            // 获取歌单
            const { data: res } = await this.$http.get('/playlist/detail?id=' + this.$route.params.playListId)
            this.requestResMessage(res, false, '获取歌单详情失败')
            this.playListDetail = res.playlist
            // 获取歌单所有歌曲的播放地址
            var playUrlRequestParams = ''
            for (var item in this.playListDetail.tracks) {
                if (item !== '0') {
                    playUrlRequestParams += ','
                }
                playUrlRequestParams += this.playListDetail.tracks[item].id
            }
            const { data: tempPlayUrlRes } = await this.$http.get('/song/url?id=' + playUrlRequestParams)
            var playUrl = []
            for (var urlItem in tempPlayUrlRes.data) {
                // 创建播放地址数列hashmap表
                playUrl[tempPlayUrlRes.data[urlItem]['id']] = tempPlayUrlRes.data[urlItem]['url']
            }
            for (var tracksItem in this.playListDetail.tracks) {
                this.playListDetail.tracks[tracksItem]['playUrl'] = playUrl[this.playListDetail.tracks[tracksItem]['id']]
            }
        }
    },
    filter: {},
    computed: {}
}
</script>

<style lang="less" scoped>

</style>
