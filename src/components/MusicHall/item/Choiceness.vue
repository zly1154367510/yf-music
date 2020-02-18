<template>
    <div>
        <div class='swiper'>
            <swiper :options="swiperOption">
                <!-- slides -->
                <swiper-slide v-for="(item,index) in topPlayList" :key="index" class='over-swiper-slide'>
                    <div v-for="(i,ind) in item" :key="ind" class='swiper-item-div click-item' @click="openPlayListDetail(i.id)">
                        <img class="swiper-img" :src="i.coverImgUrl">
                        <div>{{i.name}}</div>
                    </div>
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <div>
            <el-collapse v-model="activeNames"  class='collapse'>
            <el-collapse-item title="每日推荐 Consistency" name="1">
                 <el-card class="box-card">
                <music-list-table
                :inputValue="recommendMusicList"
                :inputTableFields="tableFields"></music-list-table>
                </el-card>
            </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="activeNames1"  class='collapse'>
                <el-collapse-item title="推荐新音乐 Feedback" name="1">
                    <el-card class="box-card">
                    <music-list-table
                    :inputValue="newMusicList"
                    :inputTableFields="tableFields"></music-list-table>
                    </el-card>
                </el-collapse-item>
                <el-collapse-item title="可控 Controllability" name="2">
                    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
                    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MusicListTable from './../../MusicListTable.vue'
export default {
    name: 'Choiceness',
    components: {
        MusicListTable
    },
    props: [ ],
    mounted () {
        // 取出最热歌单
        console.log('sacsa')
        this.getTopPlayList()
        // 取出推荐歌单
        this.getRecommend()
        this.getNewMusic()
    },
    data () {
        return {
            activeNames: ['1'],
            activeNames1: ['1'],
            swiperOption: {
                autoplay: 3000,
                speed: 1000
            },
            show: false,
            newMusicList: [],
            recommendMusicList: [],
            // newMusicList: [],
            // newMusicList: [],
            topPlayList: [],
            topPlayListCount: 21,
            showSwiper: true,
            tableFields: [
                { label: '操作', width: 150, is_defined: 'OperationButton' },
                { prop: 'name', 'label': '歌名', 'width': 230 },
                // { prop: 'reason', 'label': '推荐理由', 'width': 450 },
                { prop: 'artists', 'label': '歌手', 'width': 300, type: 'array', arrayIndex: ['artists'] }
            ]
            // swiperOption: {
            //     pagination: '.swiper-pagination',
            //     autoplay: 3000,
            //     loop: true
            // }
        }
    },
    methods: {
        openPlayListDetail: async function (id) {
            this.$router.push('/playListDetail/' + id)
        },
        getTopPlayList: async function () {
            const { data: res } = await this.$http.get(`top/playlist/highquality?limit=${this.topPlayListCount}`, this.loginForm)
            var tempPlayBlock = []
            for (var item in res.playlists) {
                if (tempPlayBlock.length < 6) {
                    tempPlayBlock.push(res.playlists[item])
                } else {
                    this.topPlayList.push(tempPlayBlock)
                    tempPlayBlock = []
                }
            }
        },
        getRecommend: async function () {
            var res = await this.$http.get('recommend/songs')
            if (res === undefined) {
                res = await this.$http.get('recommend/songs')
            }
            var requestRes = res.data
            if (this.requestResMessage(requestRes, false, '获取每日推荐失败')) {
                var musicList = await this.getPlayURL(requestRes.recommend)
                // console.log(musicList)
                // this.$store.commit('setMusicListData', musicList)
                this.recommendMusicList = musicList
            }
        },
        getNewMusic: async function () {
            var res = await this.$http.get('/personalized/newsong')
            if (res === undefined) {
                res = await this.$http.get('/personalized/newsong')
            }
            var requestRes = res.data
            if (this.requestResMessage(requestRes, false, '获取推荐新歌失败')) {
                var musicList = await this.getPlayURL(requestRes.result)
                // console.log(musicList)
                // this.$store.commit('setMusicListData', musicList)
                this.newMusicList = musicList
            }
        }
    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scoped>
.swiper-img{
    width: 200px;
    height: 200px;
}
.swiper{
    margin-left: 5px;
    margin-bottom: 20px
}
.swiper-item-div{
    width: 205px;
    float:right;
}
.over-swpier-slide{
}
.collapse{
    width: 600px;
    float: left;
    margin-left:30px
}
</style>
