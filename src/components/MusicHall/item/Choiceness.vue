<template>
    <div>
        <div class='swiper'>
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item,index) in getTopPlayList()" :key="index" class='over-swiper-slide'>
                    <div v-for="(i,ind) in item" :key="ind" class='swiper-item-div click-item' @click="openPlayListDetail(i.id)">
                        <img class="swiper-img" :src="i.coverImgUrl">
                        <div>{{i.name}}</div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <!-- <div class="block">
            <el-carousel trigger="click" height="150px">
                <el-carousel-item v-for="(item,index) in getTopPlayList()" :key="index" class='over-swiper-slide'>
                    <div v-for="(i,ind) in item" :key="ind" class='swiper-item-div click-item' @click="openPlayListDetail(i.id)">
                        <img class="swiper-img" :src="i.coverImgUrl">
                        <div>{{i.name}}</div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div> -->
        <br><br>
        <div class="recommendPlayList">
            <h2>推荐歌单</h2>
            <hr>
            <br>
            <div class="recommendDiv" @click='pushRecommendMusicList'>
                <div class='recommendImg'>
                    <div style="font-size:25px;text-align:center;color:black">{{recommendMusic.week}}</div>
                    <div style="font-size:100px;text-align:center;color:red">{{recommendMusic.playLength}}</div>
                </div>
                <div class='recommendText'>每日歌曲推荐</div>
            </div>
            <div class="recommendDiv" v-for="(item,index) in recommendPlayList" :key="index">
                <router-link :to="'/PlayListDetail/' + item.id">
                    <img :src="item.picUrl">
                    <div>{{item.name}}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MusicListTable from './../../MusicListTable.vue'
import axiosList from '@/api/axios_api.js'
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
    name: 'Choiceness',
    components: {
        MusicListTable
    },
    computed: {
        ...mapState(['topPlayList'])
    },
    props: [ ],
    mounted () {
        // 取出最热歌单
        this.$store.dispatch('topPlay', this.topPlayListCount)
        // 取出推荐歌单
        this.getRecommend()
        // this.getNewMusic()
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
            recommendPlayList: [],
            recommendMusic: {
                playList: [],
                playLength: 0,
                week: '星期' + this.getWeek()
            },
            topPlayListCount: 21
        }
    },
    methods: {
        ...mapGetters(['getTopPlayList']),
        ...mapActions([ 'topPlay' ]),
        pushRecommendMusicList: async function () {
            var musicList = await this.getPlayURL(this.recommendMusic.playList)
            this.$store.commit('setMusicListData', musicList)
            musicList = this.artistsToAr(musicList)
            this.$router.push({ name: 'musicList' })
        },
        openPlayListDetail: async function (id) {
            this.$router.push('/playListDetail/' + id)
        },
        getRecommend: async function () {
            // axiosList.getRecommendPlayList().then(res => {
            //     this.recommendPlayList = res.data.recommend
            // })
            var res1 = await axiosList.getRecommendPlayList()
            if (res1.data === undefined) {
                res1 = await axiosList.getRecommendPlayList()
            }
            this.recommendPlayList = res1.data.recommend
            const res = await axiosList.getRecommendMusic()
            this.recommendMusic.playList = res.data.recommend
            this.recommendMusic.playLength = res.data.recommend.length
        }
    },
    filter: {},
    watch: {}
}
</script>

<style lang="less" scoped>
.swiper-img{
    width: 260px;
    height: 260px;
}
.swiper{
    padding-left: 0px;
    display:inline
}
.swiper-item-div{
    width: 205px;
    float:left;
}
.over-swpier-slide{
    padding: 0px
}
.collapse{
    width: 600px;
    float: left;
    margin-left:30px
}
.recommendImg{
    background-color: white;
    width:200px;
    height:200px;
    color: red;
}
.recommendDiv{
    width:200px;
    height:270px;
    float:left;
    padding-right:60px;
    padding-left:60px;
}
.recommendDiv img{
    width: 200px;
    height:200px;
}
</style>
