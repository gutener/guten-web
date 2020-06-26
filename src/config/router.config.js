// eslint-disable-next-line
import {Layout, UserLayout} from '@/layouts'
import Home from "@/views/home/Home"
import Post from "@/views/story/Post"
import StoryDetail from "@/views/story/Detail"
import Seed from "@/views/fund/Seed"
import Tags from "@/views/tags/Tags"
import UserHomePage from "@/views/user/UserHomePage"
import UserHomeEdit from "@/views/user/UserHomeEdit"

import Notification from "@/views/notification/Notification"
import Mention from "@/views/notification/Mention"
import Bookmark from "@/views/bookmark/Bookmark"
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
    path: "/story/new-story",
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
    path: "/u",
    name: "User",
    redirect: '/u/:username',
    component: Layout,
    children: [
      {
        path: "/u/:username",
        component: UserHomePage
      },
      {
        path: "/u/:username/edit",
        component: UserHomeEdit
      }
    ]
  },
  {
    path: "/story/:id",
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
    path: "/notifications",
    name: "Notifications",
    component: Layout,
    redirect: '/notifications',
    children: [
      {
        path: "/notifications",
        name: "Notification",
        component: Notification
      },
      {
        path: "/notifications/mentions",
        name: "Notification",
        component: Mention
      }
    ]
  },
  {
    path: "/bookmarks",
    component: Layout,
    redirect: '/bookmarks',
    children: [
      {
        path: "/bookmarks",
        name: "Bookmark",
        component: Bookmark
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
