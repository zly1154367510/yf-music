<template>
    <div>
        <h3>私人FM</h3>
        <div class="fmCarousel">
            <el-carousel ref="carousel" type="card" height="300px" width="300px" :autoplay="false" @change="playMusic()">
                <el-carousel-item v-for="(item, index) in fmList" :key="index" >
                    <img class='fmImg' :src="item.album.blurPicUrl">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
import Player from '@/components/Player/Player.vue'
import AxiosApi from '@/api/axios_api.js'
export default {
    name: '',
    components: {
        Player
    },
    created () {
        this.getPersonalFm()
    },
    props: {},
    data () {
        return {
            fmList: [],
            fm: {
                name: '',
                src: '',
                img: ''
            }
        }
    },
    methods: {
        getPersonalFm: async function () {
            const { data: res } = await AxiosApi.getPersonalFm()
            this.fmList = await this.getPlayURL(res.data)
            this.playLineMusic(this.fmList[0])
        },
        playMusic: function () {
            var index = this.$refs.carousel.activeIndex
            this.playLineMusic(this.fmList[index])
        }
    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scoped>
.fmImg{
    height: 300px;
    width: 300px;
}
.fmCarousel{
    width: 600px;
    margin: 20px;
    float: left;
}
</style>
