<template>
    <div>
        <div id="cover" v-if="isMini == false" @click="showPlayer(1)"></div><!--遮罩层-->
        <div class="playerBody">
            <i class='el-icon-rank'  @click="showPlayer(2)" :style="isMini?'':'position: absolute;left: 12.5%;top: 2%;'"></i>
            <keep-alive>
                <vue-aplayer
                    class='aplayer'
                    :style="isMini?miniStyle:maximizeStyle"
                    :repeat="'repeat-all'"
                    :music="$store.state.musicData"
                    :autoplay="true"
                    :list="$store.state.playMusicListData"
                    theme="#696969"
                    mode="circulation"
                    :list-max-height="isMini?'0px':'300px'"
                    @play="initPlay()"
                    ref="player">
                </vue-aplayer>
            </keep-alive>
            <div v-if="isMini == false">
                <div class='lyric'>
                    <ul>
                        <!-- <el-collapse-transition> -->
                        <li v-for="(item, index) in lyric" :key="index"  :class="index==nowLyricIndex ? 'now_lyric' : 'other_lyric'" >{{item[1]}}</li>
                        <!-- </el-collapse-transition> -->
                    </ul>
                </div>
                <div class="comment">
                    <h3>精彩评论</h3>
                    <hr>
                    <br>
                    <ul>
                        <li v-for="(item, index) in getHotComment" :key="index">
                            <div  class="commentItem">
                                <div>
                                    <img :src="item.user.avatarUrl" class="commentUserImg">
                                </div>
                                <div>
                                    <span style="color:#6495ED;margin-right: 15px;">
                                        {{item.user.nickname+":"}}
                                    </span>{{item.content}}<br><br>
                                </div>
                            </div>
                            <div class="operate" align="right" @click="likeUp(item.commentId,item.liked)">
                                <a><i class="el-icon-s-opportunity">({{item.likedCount}})</i></a>
                            </div>
                            <hr>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueAplayer from 'vue-aplayer'
import axiosList from './../../api/axios_api.js'
// import func from '../../../vue-temp/vue-editor-bridge'
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'player',
    computed: {
        // ...mapState(['musicData'])
        getCurrentTime () {
            return this.currentTime
        },
        ...mapGetters({
            // 获取state里的评论
            getHotComment: 'getHotComment'
        })
    },
    components: {
        VueAplayer
    },
    props: [
    ],
    mounted () {
    },
    data () {
        return {
            nowLyricIndex: 0,
            nowLyricId: 'lyric_li_' + this.nowLyricIndex,
            currentTime: 99999,
            isMini: true,
            miniStyle: 'background-color: #4F4F4F;color:rgb(254, 254, 255); width: 80%',
            maximizeStyle: 'background-color: #4F4F4F;color:rgb(254, 254, 255);position:absolute;top:0%;width: 20%',
            duration: 0,
            listHeight: '0px',
            lyric: [],
            comment: [],
            currentMusicId: 0
        }
    },
    methods: {
        // 获取评论的请求方法
        ...mapActions(['hotComment']),
        test: function () {
            // 已播放时间
            // console.log(this.$refs.audio.currentTime)
            // // 视频总时间
            // console.log(this.$refs.audio.duration)
            // // 缓冲时间
            // console.log(this.$refs.audio.buffered)
        },
        initPlay: function (params) {
            var currentSrc = this.$refs.player.audio.currentSrc.split('/')
            currentSrc = currentSrc[currentSrc.length - 1]
            var musicListData = this.$store.state.playMusicListData
            for (var index in musicListData) {
                var src = musicListData[index].src.split('/')
                src = src[src.length - 1]
                if (src === currentSrc) {
                    this.currentMusicId = musicListData[index].id
                    // 获取评论
                    this.hotComment({id: musicListData[index].id, limit: 10})
                    // 获取歌词
                    this.getVLyric(musicListData[index].id)
                }
            }
            window.setInterval(() => {
                this.currentTime = this.$refs.player.audio.currentTime
            }, 500)
        },
        getVLyric: async function (id) {
            const res = await axiosList.getLyric(id)
            var tempLyrci = res.data.lrc.lyric.split('[')
            var lyric = []
            var tempLyrciItem = []
            for (var index in tempLyrci) {
                tempLyrciItem = tempLyrci[index].split(']')
                if (tempLyrciItem.length !== 1) {
                    tempLyrciItem[0] = this.minuteToSecond(tempLyrciItem[0])
                    lyric.push([tempLyrciItem[0], tempLyrciItem[1]])
                }
            }
            this.lyric = lyric
        },
        showPlayer: function (num) {
            // if (num === 1) {
            //     this.isMini = true
            // } else {
            //     this.isMini = false
            // }
            this.isMini = !this.isMini
        },
        buildLyric: function (data) {
            for (var index in this.lyric) {
                index = parseInt(index)
                if (index === this.lyric && this.lyric[index][0] < data) {
                    // 如果已经循环到最后一个了 则不存在最后一个的下一个
                    this.nowLyricIndex = index
                } else if (this.lyric[index][0] < data && this.lyric[index + 1][0] > data) {
                    this.nowLyricIndex = index
                }
            }
        },
        likeUp: function (cId, liked) {
            var paramsLiked = liked ? 0 : 1
            axiosList.likeUp(this.currentMusicId, cId, paramsLiked, 0).then(res => {
                if (res.data.code === 200) {
                    this.hotComment({id: this.currentMusicId, limit: 10})
                }
            }).catch(error => {
                console.log(error)
            })
        }
        // getVHotComment: function(id, limit) {
        //     this.hotComment({id, limit: limit})
        // }
    },
    filter: {},
    watch: {
        currentTime: function (data) {
            this.buildLyric(data)
        }
    }
}
</script>

<style lang="less" scoped>
#cover{
    position:absolute;left:0px;top:0px;
    background:rgba(0, 0, 0, 1.0);
    width:100%;  /*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
    height:200%;
    filter:alpha(opacity=100);  /*设置透明度为60%*/
    opacity:1.0;  /*非IE浏览器下设置透明度为60%*/
    z-Index:100;
}
/deep/.playerBody > *{
     z-Index:9999;
}
.playerBody {
    display: flex;
    justify-content: initial;
}
// .pic {
//     position:absolute;
//     left: 50%;
//     top:5%;
//     width:300px;
//     height:300px;
//     z-Index:9999;
// }
.lyric {
    line-height:25px;
    overflow:hidden;
    position:absolute;
    left: 50%;
    top:5%;
    width:300px;
    height:300px;
    z-Index:9999;
}
.el-icon-rank{
    z-index: 998;
}
.commentItem{
    display:flex;
    justify-content: flex-start;
    margin-top: 15px;
}
.miniButton{
    position:absolute;
    right: 10%;
    top:5%;
    z-Index:9999;
}
.now_lyric {
    color:red
}

.now_lyric ~ .other_lyric{
    display: block;
}
.comment {
    position: absolute;
    left:5%;
    top:60%;
    width:40%
}
.other_lyric {
    display: none
}
.commentUserImg{
    width:40px;
    height:40px;
    margin-right: 15px;
    border-radius: 20px;
}
.operate{
    margin-bottom: 15px;
}
</style>
