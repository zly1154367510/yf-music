<template>
    <div>
        <div class='container'>
            <el-tabs v-model="activeTab">
                <el-tab-pane class="el-tab-pane-item" label="个性推荐" name="first">
                    <choiceness></choiceness>
                </el-tab-pane>
                <el-tab-pane class="el-tab-pane-item" label="歌单" name="second">排行</el-tab-pane>
                <el-tab-pane class="el-tab-pane-item" label="主播电台" name="third">歌手</el-tab-pane>
                <el-tab-pane class="el-tab-pane-item" label="排行榜" name="fourth">分类</el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import Choiceness from './item/Choiceness'
export default {
    name: '',
    components: {
        Choiceness
    },
    props: {},
    data () {
        return {
            activeTab: 'first'
        }
    },
    methods: {

    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scoped>
/deep/.el-tabs__nav-wrap {
    background-color:#2B2B2B
}
/deep/ .el-tabs__item {
    color: white;
    text-align:center;
}
/deep/ .el-tabs__nav{
    position: relative;
    left:35%;
}
.container{
    margin:0px;
    padding:0px;
    width:100%;
}
/deep/ .el-tabs__content {
    margin:15px;
}
/deep/ .over-swiper-slide{
    padding:0px;
}
</style>
