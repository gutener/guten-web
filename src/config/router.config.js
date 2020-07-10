// eslint-disable-next-line
import {Layout, UserLayout} from '@/layouts'
import Home from "@/views/home/Home"
import Post from "@/views/story/Post"
import StoryDetail from "@/views/story/Detail"
import Seed from "@/views/fund/Seed"
import Tags from "@/views/tags/Tags"
import ProfileItem from "@/views/user/profile/Profile_Item"
import SeedHistory from "@/views/user/seedinfo/SeedHistory"
import UserHomeEdit from "@/views/user/UserHomeEdit"
import Notification from "@/views/notification/Notification"
import Mention from "@/views/notification/Mention"
import Bookmark from "@/views/bookmark/Bookmark"
import Explore from "@/views/explore/Explore"
import ShortText from "@/views/shorttext/ShortText"


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
    path: "/creation",
    name: "ShortText",
    component: Layout,
    children: [
      {
        path: ":st_id",
        component: ShortText
      }
    ]
  },
  {
    path: "/hashtag",
    name: "Hashtag",
    component: Layout,
    children: [
      {
        path: ":tagName",
        component: Tags
      }
    ]
  },
  {
    path: "/explore",
    name: "Explore",
    redirect: '/explore',
    component: Layout,
    children: [
      {
        path: "/explore",
        meta: {title: "探索"},
        component: Explore
      }
    ]
  },
  {
    path: '/u',
    name: 'User',
    component: Layout,

    children: [
      {
        path: '/u/:username',
        component: ProfileItem,
      },
      {
        path: '/u/:username/short_text',
        component: ProfileItem,
      },
      {
        path: '/u/:username/media',
        component: ProfileItem,
      },
      {
        path: '/u/:username/seeding',
        component: SeedHistory
      },
      {
        path: '/u/:username/seeded',
        component: SeedHistory
      },
      {
        path: '/u/:username/edit',
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
        meta: {title: '通知'},
        component: Notification
      },
      {
        path: "/notifications/mentions",
        name: "Mention",
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
        meta: {title: '书签'},
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
        component: Home,
        meta: {title: '主页'}
      }
    ]
  }
]
