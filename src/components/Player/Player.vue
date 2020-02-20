<template>
    <div>
        <h1>{{music.name}}</h1>
    </div>
</template>

<script>
export default {
    name: 'player',
    components: {},
    props: [
        'musicList',
        'music'
    ],
    mounted () {
        // console.log(this.music)
        // console.log(this.$refs.audio.played)
    },
    data () {
        return {
            duration: 0
        }
    },
    methods: {
        test: function () {
            // 已播放时间
            // console.log(this.$refs.audio.currentTime)
            // // 视频总时间
            // console.log(this.$refs.audio.duration)
            // // 缓冲时间
            // console.log(this.$refs.audio.buffered)
        }
    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scoped>

</style>
