import { createRouter, createWebHistory } from 'vue-router'

//导入组件
import LoginVue from '@/views/Login.vue'
import Administrator from '@/views/administrator/Administrator.vue'
import UserCommunity from '@/views/user/UserCommunity.vue'
import UserMain from '@/views/user/UserMain.vue'
import UserPlanCustomization from '@/views/user/UserPlanCustomization.vue'
import LayoutVue from '@/views/Layout.vue'
import UserCenter from '../views/user/UserCenter.vue'
import AdministratorInfo from '../views/administrator/AdministratorInfo.vue'
import AdministratorUserMng from '../views/administrator/AdministratorUserMng.vue'
import Administratortuisong from '../views/administrator/Administratortuisong.vue'
import AdministratorCommunityMng from '../views/administrator/AdministratorCommunityMng.vue'
import Mall from '../views/user/Mall.vue'
import Bag from '../views/user/Bag.vue'
import AdministratorInterests from '../views/administrator/AdministratorInterests.vue'
import Post from "@/views/Post.vue";
//定义路由关系
const routes = [
    { path: '/login', component: LoginVue },
    { path:'/administrator',component:Administrator,redirect:'/administrator/user',children:[
        { path: '/administrator/user', component:AdministratorUserMng },
        { path: '/administrator/info', component: AdministratorInfo },
        { path: '/administrator/tuisong', component: Administratortuisong },
        { path: '/administrator/community', component: AdministratorCommunityMng },
        { path: '/administrator/interest', component: AdministratorInterests },
    ]},
    {
        path: '/', component: LayoutVue,redirect:'/user/main', children: [
            { path: '/user/main', component:UserMain },
            { path: '/user/community', component: UserCommunity },
            { path: '/user/plan', component: UserPlanCustomization },
            {path:'/user/center',component:UserCenter},
            {path:'/user/mall',component:Mall},
            {path:'/user/bag',component:Bag}
        ]
    },
    {
        path: '/post/:id',
        name: 'PostDetail',
        component: Post
    }
]

//创建路由器
const router = createRouter({
    mode:'hash',
    history: createWebHistory(),
    routes: routes
})

//导出路由
export default router
