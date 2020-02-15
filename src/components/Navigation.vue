<template>
    <div>
        <navigation-item :navigationConfig="onlineNavigationConfig"></navigation-item>
        <navigation-item :navigationConfig="localNavigationConfig"></navigation-item>
        <navigation-item :navigationConfig="userPlayListConfig" :navigation="'dynamicItem'"></navigation-item>
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
                var userPlayListItem = { title: '我的歌单', navigationItemConfig: [] }
                for (var index in data) {
                    userPlayListItem.navigationItemConfig.push({
                        name: data[index]['name'],
                        imgURL: data[index]['coverImgUrl'],
                        to: '/playListDetail/' + data[index]['id']
                        // to: '/PlayListDetail'
                    })
                }
                this.userPlayListConfig.push(userPlayListItem)
            }
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
