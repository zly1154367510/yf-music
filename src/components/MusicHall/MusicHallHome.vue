<template>
    <div>
        <h2>音乐馆</h2>
        <div class='container'>
            <el-tabs>
                <el-tab-pane label="精选" name="first">
                    <choiceness></choiceness>
                </el-tab-pane>
                <el-tab-pane label="排行" name="second">排行</el-tab-pane>
                <el-tab-pane label="歌手" name="third">歌手</el-tab-pane>
                <el-tab-pane label="分类" name="fourth">分类</el-tab-pane>
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

</style>
