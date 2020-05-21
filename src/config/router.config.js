// eslint-disable-next-line
import { UserLayout,Layout } from '@/layouts'
import Home from "@/views/home/Home"
import Post from "@/views/story/Post"
import Fund from "@/views/fund/Fund"
import Seed from "@/views/fund/Seed"
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
    path: "/fund",
    name: "Fund",
    component: Layout,
    redirect: {
      name: "Seed"
    },
    children: [
      {
        path: "/fund/seed",
        name: "Seed",
        component: Seed
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        component: Home
      },
      {
        path: "/story/post",
        name: "Post",
        component: Post
      }
    ]
  }
]
