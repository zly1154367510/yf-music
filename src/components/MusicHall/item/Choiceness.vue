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
    </div>
</template>

<script>
// import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    name: 'Choiceness',
    components: {
        // swiper,
        // swiperSlide
    },
    props: [ ],
    created () {
        // 取出最热歌单
        this.getTopPlayList()
    },
    data () {
        return {
            swiperOption: {
                autoplay: 3000,
                speed: 1000
            },
            topPlayList: [],
            topPlayListCount: 21,
            showSwiper: true
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
}
.swiper-item-div{
    width: 205px;
    float:right;
}
.over-swpier-slide{
}
</style>
