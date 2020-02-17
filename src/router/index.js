import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import MusicHallHome from '../components/MusicHall/MusicHallHome.vue'
import PlayListDetail from '../components/PlayListDetail.vue'
import MusicListTable from '../components/MusicListTable.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Home,
            redirect: '/MusicHallHome',
            children: [
                {
                    path: '/MusicHallHome',
                    component: MusicHallHome
                },
                {
                    path: '/PlayListDetail/:playListId',
                    component: PlayListDetail
                },
                {
                    path: '/PlayListDetail/:playListId/:is_my',
                    component: PlayListDetail
                },
                {
                    path: '/MusicListTable',
                    name: 'musicList',
                    component: MusicListTable
                }
            ]
        }
    ]
})
