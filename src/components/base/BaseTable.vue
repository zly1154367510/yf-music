<template>
    <div class='table'>
        <el-table
        :cell-style="tableRowStyle"
        :header-cell-style="tableRowStyle"
        :data="value"
        style="width: 100%"
        stripe
        @row-click="rowClick"
        >
            <el-table-column
                :key = i.prop
                v-for="i in tableFields"
                :prop="i.prop"
                :label="i.label"
                :width="i.width"
                :formatter="i.decorator">
                    <template slot-scope='scope'>
                            <el-switch v-if="i.is_switch===true" v-model='scope.row.mg_state' @change="switchChange(scope.row)"></el-switch>
                            <div class='button_list'  v-else-if="i.is_defined==='OperationButton'">
                                <el-button type="warning" icon="el-icon-star-off" circle @click='arrange(scope.row.id)'></el-button>
                                <el-button type="danger" icon="el-icon-delete" circle @click="delele(scope.row.id)"></el-button>
                                <el-button type="success" icon="el-icon-check" circle></el-button>
                            </div>
                            <div v-if="i.type=='array'">
                                <span v-for="rowItem in scope.row[i.arrayIndex]" :key="rowItem.id">
                                    {{rowItem['name']}}
                                </span>
                            </div>
                            <span v-else>{{scope.row[i.prop]}}</span>
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
    data () {
        return {
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
            console.log(value)
            this.$emit('updateRow', value)
        },
        arrange: function (value) {
            this.$emit('showUpdateUserDialog', value)
        },
        delele: function (value) {
            this.$emit('showDelUserMessageBox', value)
        },
        tableRowStyle: function () {
            return { backgroundColor: 'black' }
        }
    },
    filter: {},
    computed: {},
    watch: {}
}
</script>

<style lang="less" scope>
.el-pagination{
    padding-top: 15px
}

</style>
