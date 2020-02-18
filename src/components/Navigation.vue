<template>
    <div>
        <navigation-item :navigationConfig="onlineNavigationConfig"></navigation-item>
        <!-- <navigation-item :navigationConfig="localNavigationConfig"></navigation-item> -->
        <navigation-item :navigationConfig="userPlayListConfig" :navigation="'dynamicItem'" @iClick='addPlayListVisible=true'></navigation-item>
        <el-dialog
        title="添加歌单"
        :visible.sync="addPlayListVisible"
        width="22%"
        >
        <span>输入歌单名称</span>
        <span slot="footer" class="dialog-footer">
            <el-form ref="form" :model="addPlayListForm" label-width="80px">
                <el-form-item label="歌单名称">
                    <el-input v-model="addPlayListForm.name"></el-input>
                </el-form-item>
                <el-checkbox-group v-model="addPlayListForm.type">
                    <el-checkbox label="是否私密歌单" name="type"></el-checkbox>
                </el-checkbox-group>
            </el-form>
            <el-button type="primary" @click="addPlayList">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script>
import NavigationItem from './NavigationItem.vue'
export default {
    name: 'navigation',
    components: {
        NavigationItem
    },
    created () {
        if (this.$store.isLogin) {
            this.getUserPlayList()
        }
    },
    props: {},
    data () {
        return {
            addPlayListForm: {
                name: '',
                type: ''
            },
            addPlayListVisible: false,
            userPlayListConfig: [
            ],
            onlineNavigationConfig: [
                {
                    title: '在线音乐',
                    navigationItemConfig: [
                        {
                            name: '音乐馆',
                            icon: 'music',
                            to: '/MusicHallHome'
                        },
                        {
                            name: '视频',
                            icon: 'video',
                            to: '/MusicHallHome'
                        },
                        {
                            name: '电台',
                            icon: 'radio',
                            to: '/MusicHallHome'
                        }
                    ]
                }
            ],
            localNavigationConfig: [
                {
                    'title': '我的音乐',
                    navigationItemConfig: [
                        {
                            name: '我喜欢',
                            icon: 'like',
                            to: 'MusicHallHome'
                        }
                        // {
                        //     name: '本地和下载',
                        //     icon: 'local',
                        //     to: 'MusicHallHome'
                        // },
                        // {
                        //     name: '播放历史',
                        //     icon: 'history',
                        //     to: 'MusicHallHome'
                        // }
                    ]
                }
            ]
        }
    },
    methods: {
        getUserPlayList: async function () {
            const { data: requestRes } = await this.$http.get(`/user/playlist?uid=${this.$store.state.userId}`)
            this.userPlayListConfig = []
            this.userPlayList = []
            if (this.requestResMessage(requestRes, false, '获取用户歌单失败')) {
                // 获取我的歌单动态列表并构建适用于组件的数据结构
                var data = requestRes.playlist
                var userPlayListItem = { title: '我的歌单', navigationItemConfig: [], 'is_defined_play_list': 1 }
                for (var index in data) {
                    userPlayListItem.navigationItemConfig.push({
                        name: data[index]['name'],
                        imgURL: data[index]['coverImgUrl'],
                        // to: '/playListDetail/' + data[index]['id'] + '?is_my_play_list=1'
                        to: '/playListDetail/' + data[index]['id'] + '/1'
                        // to: { path: '/playListDetail/' + data[index]['id'], query: { is_my_play_list: 1 } }
                        // to: '/PlayListDetail'
                    })
                }
                this.userPlayListConfig.push(userPlayListItem)
            }
        },
        addPlayList: async function () {
            var url = `/playlist/create?name=${this.addPlayListForm.name}`
            if (this.addPlayListForm.type) {
                url += `&privacy=10 `
            }
            const requestRes = await this.$http.get(url)
            if (this.requestResMessage(requestRes.data, false, '创建歌单失败')) {
                this.getUserPlayList()
            }
            this.addPlayListVisible = false
        }
    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scoped>
.navigation-header{
    color:rgb(77, 77, 77);
    font-size: 13px;
    padding-left: 10%
}
.navigation-item{

}

</style>
