<template>
        <el-container class='home-container'>
            <el-aside width="200px">
                <logo class='logo'></logo>
                <navigation ref="navigation"></navigation>
            </el-aside>
            <el-container>
                <el-header>
                    <el-page-header @back="goPreviousPage" content="" ></el-page-header>
                    <el-input
                        placeholder="请输入搜索内容"
                        prefix-icon="el-icon-search"
                        v-model="keyword"
                        size="mini"
                        width="200px"
                        class="keyword-input-text"
                        @keyup.enter.native="queryKeyword"
                        >
                    </el-input>
                    <el-button type="success" round  v-if="isLogin" @click="logout">已登录</el-button>
                    <el-button type="success" round @click='loginDialogVisible=true' v-else>点击登录</el-button>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer class='el-footer'>
                    <a-player
                    v-if="musicData != false"
                    :music="musicData"
                    :float="true"
                    :autoplay="true"
                    :list="$store.state.playMusicListData"
                    theme="#696969"
                    mode="circulation"
                    listmaxheight='96px'
                    ref="player"></a-player>
                </el-footer>
            </el-container>
            <el-dialog
            title="登录"
            :visible.sync="loginDialogVisible"
            width="30%"
            >
            <span>登录</span>
            <el-form ref="loginForm" :rule="loginRule" :model="loginForm" label-width="80px">
                <el-form-item label="手机号码">
                    <el-input v-model="loginForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="loginForm.password" show-password></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkLogin">确 定</el-button>
            </span>
            </el-dialog>
        </el-container>
</template>

<script>
import navigation from './Navigation'
import logo from './Logo'
import { mapState } from 'vuex'
import VueAplayer from 'vue-aplayer'
export default {
    name: 'home',
    created () {
        this.checkLoginStatus()
    },
    computed: {
        ...mapState(['isLogin', 'token', 'userId', 'musicData', 'musicList'])
    },
    components: {
        'a-player': VueAplayer,
        navigation,
        logo
    },
    props: {},
    data () {
        return {
            keyword: '',
            keywordQueryData: [],
            loginForm: {
                phone: '',
                password: ''
            },
            loginDialogVisible: false,
            loginRule: [
            ]
        }
    },
    methods: {
        queryKeyword: async function (e) {
            // 关键字搜索歌曲
            var keyCode = window.event ? e.keyCode : e.which
            if (keyCode === 13) {
                const {data: searchRes} = await this.$http.get('/search?keywords=' + this.keyword)
                if (this.requestResMessage(searchRes, false, '获取搜索结果失败')) {
                    var res = await this.getPlayURL(searchRes.result.songs)
                    this.$store.commit('setMusicListData', res)
                    if (this.$route.path !== '/MusicListTable') {
                        this.$router.push({ name: 'musicList' })
                    }
                }
            }
        },
        goPreviousPage: function () {
            // 返回上一个页面
            this.$router.go(-1)
        },
        checkLogin: async function () {
            const { data: res } = await this.$http.post('/login/cellphone', this.loginForm)
            var loginRes = this.requestResMessage(res, '登录成功', '登陆失败')
            if (loginRes) {
                // 存储token uid 和登陆状态
                this.$store.commit('setToken', res.token)
                this.$store.commit('loginStatus', true)
                this.$store.commit('setUserId', res.profile.userId)
                this.loginDialogVisible = false
                // 刷新用户歌单
                this.$refs.navigation.getUserPlayList()
            }
        },
        checkLoginStatus: async function () {
            var requestRes = await this.$http.get('/login/status')
            console.log(requestRes)
            if (requestRes.data) {
                const res = requestRes.data
                if (res !== undefined && res.code === 301) {
                    this.$store.commit('loginStatus', false)
                    this.$store.commit('setUserId', 0)
                } else {
                    this.$store.commit('loginStatus', true)
                    this.$store.commit('setUserId', res.profile.userId)
                    this.$refs.navigation.getUserPlayList()
                }
            }
        },
        logout: async function () {
            this.$http.get('/logout')
            this.checkLoginStatus()
        }
    },
    filter: {},
    watch: {}
}
</script>

<style lang="less" scoped>
.home-container{
    height: 100%;
    width: 100%;
    position: absolute;
}
.logo{
    height: 10%;
}
.el-header{
    display:flex;
    justify-content: space-between;
    padding-left: 0%;
    align-items: center;
    background-color:#4F4F4F;
    color: #458B74
}
.el-aside{
    background-color:#2B2B2B
}
.el-main{
    background-color:black
}
.el-footer{
    background-color: #4F4F4F;
}
.el-dialog{
    color: #2B2B2B
}

/deep/.el-input__inner{
    margin-left: 20px;
    width: 200px;
    background-color: #2B2B2B
}

/deep/ .el-input__prefix{
      margin-left: 20px;
}
/deep/.el-page-header {
    width: 100px;
}
</style>
