<template>
    <div>
        <div class='swiper'>
            <swiper :options="swiperOption">
                <!-- slides -->
                <swiper-slide v-for="item in topPlayList" :key="item.id">
                <img class="swiper-img" :src="item.coverImgUrl" alt="">
                </swiper-slide>
                <!-- Optional controls -->
                <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
            </div>
    </div>
</template>

<script>
export default {
    name: 'Choiceness',
    components: {},
    props: [ ],
    created () {
        // 取出最热歌单
        this.topPlayList = this.getTopPlayList()
    },
    data () {
        return {
            topPlayList: [],
            topPlayListCount: 5,
            showSwiper: true,
            swiperOption: {
                pagination: '.swiper-pagination',
                autoplay: 3000,
                loop: true
            }
        }
    },
    methods: {
        getTopPlayList: async function () {
            // console.log(this)
            const { data: res } = await this.$http.get(`top/playlist/highquality?limit=${this.topPlayListCount}`, this.loginForm)
            return res.playlists
        }
    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scoped>

</style>
