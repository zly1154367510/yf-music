<template>
    <div class='table'>
        <el-table
        v-loading="$store.state.loading"
        :cell-style="tableRowStyle"
        :header-cell-style="tableRowStyle"
        :data="value"
        style="width: 100%"
        stripe
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        >
            <el-table-column
                :key = i.prop
                v-for="i in tableFields"
                :prop="i.prop"
                :label="i.label"
                :width="i.width"
                :formatter="i.decorator"
                class="click-item">
                    <template slot-scope='scope'>
                            <div :style="scope.row['playUrl'] == null && 'playUrl' in scope.row?'text-decoration: line-through;color:#FFDEAD':''">
                                <el-switch v-if="i.is_switch===true" v-model='scope.row.mg_state' @change="switchChange(scope.row)"></el-switch>
                                <div class='button_list'  v-else-if="i.is_defined==='OperationButton' && is_my==1">
                                    <el-button type="success" icon="el-icon-video-play" circle @click='rowClick(scope.row)'></el-button>
                                    <el-button type="success" icon="el-icon-folder-add" circle @click="showPlayListDialog(scope.row.id)"></el-button>
                                    <el-button type="success" icon='el-icon-remove' @click="removeMusic(scope.row.id)" circle></el-button>
                                </div>
                                <div class='button_list'  v-else-if="i.is_defined==='OperationButton'">
                                    <el-button type="success" icon="el-icon-video-play" circle @click='rowClick(scope.row)'></el-button>
                                    <el-button type="success" icon="el-icon-folder-add" circle @click="showPlayListDialog(scope.row.id)"></el-button>
                                    <!-- <el-button type="success" icon="el-icon-check" circle></el-button> -->
                                </div>
                                <div class='button_list' v-else-if="i.is_defined==='addFavorite'">
                                     <el-button type="success" icon="el-icon-folder-add" circle @click="addFavorite(scope.row.id)"></el-button>
                                </div>
                                <div v-if="i.type=='array'">
                                    <span v-for="(rowItem, index) in scope.row[i.arrayIndex]" :key="rowItem.id">
                                        <span v-if="index != 0">{{' / '+rowItem['name']}}</span>
                                        <span v-else>{{rowItem['name']}}</span>
                                    </span>
                                </div>
                                <div  v-else-if="i.is_defined==='img'"><img :src="scope.row[i.prop]" width="40px" height="40px"></div>
                                <span v-else class="click-item">{{scope.row[i.prop]}}</span>
                            </div>
                    </template>

                    <!-- <el-switch v-if="i.is_switch"></el-switch> -->
            </el-table-column>
        </el-table>
            <!-- <div class="block">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="paramsInfo.pagenum"
                :page-sizes="[1, 20, 100, 200]"
                :page-size="paramsInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div> -->
    </div>
</template>

<script>
export default {
    name: 'BaseTable',
    // value 获取父组件双向绑定的值
    props: ['tableFields', 'paramsInfo', 'total', 'url', 'value'],
    mounted () {
        console.log(this.$route.params)
        this.setIsMy()
    },
    updated () {
        // console.log(this.$route.params)
        // this.setIsMy()
    },
    data () {
        return {
            is_my: 0
        }
    },
    components: {
    },
    methods: {
        rowClick: function (row) {
            this.$emit('rowClick', row)
        },
        handleSizeChange: async function (value) {
            // 监听每页多少条的变化
            this.paramsInfo.pagesize = value
            this.$emit('getList', this.paramsInfo)
        },
        handleCurrentChange: function (value) {
            this.paramsInfo.pagenum = value
            this.$emit('getList', this.paramsInfo)
        },
        switchChange: function (value) {
            this.$emit('updateRow', value)
        },
        arrange: function (value) {
            this.$emit('showUpdateUserDialog', value)
        },
        showPlayListDialog: function (value) {
            this.$emit('showPlayListDialog', value)
        },
        tableRowStyle: function () {
            return { backgroundColor: 'black' }
        },
        addFavorite: function (row) {
            this.$emit('addFavorite', row)
        },
        removeMusic: function (id) {
            this.$emit('removeFavorite', id)
        },
        setIsMy: function () {
            if (this.$route.params.is_my === '1') {
                this.is_my = 1
            } else {
                this.is_my = 0
            }
        }
    },
    filter: {},
    computed: {},
    watch: {
        $route (to, from) {
            this.setIsMy()
        }
    }
}
</script>

<style lang="less" scope>
.el-pagination{
    padding-top: 15px
}

.button_list {
    float: left;
}

</style>
