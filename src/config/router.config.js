// eslint-disable-next-line
import { UserLayout,Layout } from '@/layouts'
import Home from "@/views/home/Home.vue"
import Find from "@/views/home/Find.vue"
import Specials from "@/views/home/Specials.vue";
/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  },
  {
    path: "/",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home,
        title: "主页"
      },
      {
        path: "/zhihu/find",
        name: "Find",
        component: Find,
        title: "发现"
      },
      {
        path: "/zhihu/specials",
        name: "Specials",
        component: Specials,
        title: "热榜"
      }
    ]
  },
]
