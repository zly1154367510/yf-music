<template>
    <div>
        <div class="header">
            <img :src="playListDetail.coverImgUrl">
            <span>{{playListDetail.name}}</span>
        </div>
        <music-list-table
        :inputTableFields="tableFields"
        ></music-list-table>
    </div>
</template>

<script>
// import BaseTable from './base/BaseTable'
import MusicListTable from './MusicListTable'
export default {
    name: '',
    components: {
        // BaseTable,
        MusicListTable
    },
    mounted () {
        this.getPlayListDetail()
        this.init()
    },
    props: [
        'tableFields'
    ],
    watch: {
        // 监听url栏的参数变化 如果变化了则刷新数据
        '$route' (to, from) {
            // console.log(to)
            // console.log(from)
            if (to.params.playListId !== undefined) {
                this.getPlayListDetail()
            }
        }
    },
    data () {
        return {
            playListDetail: {}
        }
    },
    methods: {
        getPlayListDetail: async function () {
            // 获取歌单
            const { data: res } = await this.$http.get('/playlist/detail?id=' + this.$route.params.playListId)
            this.requestResMessage(res, false, '获取歌单详情失败')
            // this.playListDetail = res.playlist
            if (this.requestResMessage(res, false, '获取歌单详情失败')) {
                var musicList = await this.getPlayURL(res.playlist.tracks)
                this.$store.commit('setMusicListData', musicList)
            }
        },
        init: function () {
            if (this.tableFeilds === null || this.tableFields === undefined) {
                this.tableFields = this.tableFields
            }
        }
    },
    filter: {},
    computed: {}
}
</script>

<style lang="less" scoped>

</style>
