// eslint-disable-next-line
import {Layout, UserLayout} from '@/layouts'
import Home from "@/views/home/Home"
import Post from "@/views/stories/Post"
import StoryDetail from "@/views/stories/Detail"
import Seed from "@/views/fund/Seed"
import Tags from "@/views/tags/Tags"

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
    path: "/stories",
    name: "Story",
    redirect: '/new-story',
    component: Layout,
    children: [
      {
        path: "/new-story",
        component: Post
      }
    ]
  },
  {
    path: "/hashtag",
    name: "Hashtag",
    redirect: '/hashtag',
    component: Layout,
    children: [
      {
        path: "/hashtag/:tagName",
        component: Tags
      }
    ]
  },
  {
    path: "/stories/:id",
    component: StoryDetail,
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
      }
    ]
  }
]
