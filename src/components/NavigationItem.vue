<template>
    <div>
        <div v-for="i in navigationConfig " :key="i.title" class='dynamicItem'>
            <div v-if="navigation !== 'dynamicItem'">
                <p class='navigation-header'>{{i.title}}</p>
                <p class='navigation-item' v-for="item in i.navigationItemConfig" :key="item.name">
                    <router-link :to="item.to">
                    <img :src="getImgUrl(item.icon)" class="navigation-item-img">
                    <span class='navigation-item-text'>{{item.name}}</span>
                    </router-link>
                </p>
            </div>
            <div  v-else>
                <p class='navigation-header'>{{i.title}}
                    <i v-if="i.is_defined_play_list" class='add_play_list_button el-icon-plus' @click="iClick"></i>
                </p>
                <p class='navigation-item' v-for="item in i.navigationItemConfig" :key="item.name">
                    <router-link :to="item.to">
                        <img :src="item['imgURL']" class="navigation-item-img">
                        <span class='navigation-item-text'>{{item.name}}</span>
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavigationItem',
    components: {},
    props: [ 'navigationConfig', 'navigation' ],
    data () {
        return {

        }
    },
    methods: {
        getImgUrl: function (icon) {
            return require('./../assets/icon/' + icon + '.png')
        },
        iClick: function (row) {
            this.$emit('iClick', '')
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
    padding-left: 10%;
    margin-bottom: 20px;
    margin-top: 20px;
}
.navigation-item{
    margin-left: 15%;
    margin-bottom: 10%;
    font-size: 13px;
}
.navigation-item-img{
    filter: invert(100%);
    width: 18px;
    height: 18px;
    margin-right: 5%;
    vertical-align: middle;
}
.navigation-item-text{
     vertical-align: middle;
}
.add_play_list_button{
    background-color: #2B2B2B;
    margin-left: 20px;
}
.add_play_list_button:hover{
    background-color:rgb(50, 113, 172);
    cursor: pointer;
}
</style>
