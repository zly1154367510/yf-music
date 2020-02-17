<template>
    <div>
        <div class="table">
            <base-table
            :tableFields="tableFields"
            :value="$store.state.musicListData"
            @rowClick="playMusic"
            @showPlayListDialog='showPlayListDialog'
            @removeFavorite='removeFavorite'>
             </base-table>
        </div>
        <el-dialog
            title="歌单列表"
            :visible.sync="dialogVisible"
            width="40%"
            >
            <span>歌单列表</span>
            <span slot="footer" class="dialog-footer">
                <base-table
                :tableFields="musicPlaytableFields"
                :value="playListData"
                @addFavorite='addFavorite'>
                </base-table>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
            tableFields: this.tableFields,
            dialogVisible: false,
            playListData: [],
            is_my_play_list: this.$route.query.is_my_play_list,
            addFavoriteMusicId: 0,
            musicPlaytableFields: [
                { label: '操作', width: 60, is_defined: 'addFavorite' },
                { 'prop': 'coverImgUrl', label: '封面', width: 300, is_defined: 'img' },
                { 'prop': 'name', label: '歌单名', width: 250 }
            ]
        }
    },
    methods: {
        playMusic: function (row) {
            this.buildPlayMusicList(this.$store.state.musicListData)
            this.playLineMusic(row)
        },
        showPlayListDialog: async function (id) {
            if (this.playListData.length === 0) {
                const {data: playList} = await this.$http.get('/user/playlist?uid=' + this.$store.state.userId)
                if (this.requestResMessage(playList, false, '获取歌单列表失败')) {
                    this.playListData = playList.playlist
                }
            }
            this.addFavoriteMusicId = id
            this.dialogVisible = true
        },
        addFavorite: async function (row, option = 'add') {
            // /playlist/tracks?op=add&pid=24381616&tracks=347231
            if (this.addFavoriteMusicId !== 0) {
                const { data: res } = await this.$http.get(`/playlist/tracks?op=${option}&pid=${row}&tracks=${this.addFavoriteMusicId}`)
                if (res.code !== 200) {
                    this.$message(res.message)
                } else {
                    this.$message('添加成功,添加歌曲需要两分钟后生效')
                }
            }
            this.dialogVisible = false
        },
        removeFavorite: async function (row, option = 'del') {
            const { data: res } = await this.$http.get(`/playlist/tracks?op=${option}&tracks=${row}&pid=${this.$route.params.playListId}`)
            if (res.code !== 200) {
                this.$message(res.message)
            } else {
                this.$message('移除成功，移除歌曲需要两分钟后生效')
            }
        }
    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scoped>
/deep/.el-dialog{
    background-color: black
}
</style>
