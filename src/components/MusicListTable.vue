<template>
    <div>
        <div class="table">
            <base-table
            :tableFields="tableFields"
            :value="$store.state.musicListData"
             @rowClick='playMusic'>
             </base-table>
        </div>
    </div>
</template>

<script>
import BaseTable from './base/BaseTable.vue'
export default {
    name: '',
    components: {
        BaseTable
    },
    created () {
    },
    props: [ 'data' ],
    data () {
        return {
            tableFields: [
                { prop: 'name', 'label': '歌名', 'width': 900 },
                { prop: 'artists', 'label': '歌手', 'width': 400, type: 'array', arrayIndex: ['ar'] }
            ]
        }
    },
    methods: {
        playMusic: function (row) {
            this.buildPlayMusicList(this.$store.state.musicListData)
            this.playLineMusic(row)
        }
    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scoped>

</style>
