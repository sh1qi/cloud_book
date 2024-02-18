import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/Home/HomeView'
import LoginView from '@/views/Login/LoginView'

const HomeIndex = () => import(/* webpackChunkName:"HomeIndex" */ '@/views/Home/HomeIndex')
const BookView = () => import(/* webpackChunkName:"BookView" */ '@/views/Book/BookView')
const NewBookItem = () => import(/* webpackChunkName:"NewBookItem" */ '@/views/Book/NewBookItem')
const UserView = () => import(/* webpackChunkName:"UserView" */ '@/views/User/UserView')
const NewUserItem = () => import(/* webpackChunkName:"NewUserItem" */ '@/views/User/NewUserItem')
const NoticeView = () => import(/* webpackChunkName:"NoticeView" */ '@/views/Notice/NoticeView')
const NewNoticeItem = () => import(/* webpackChunkName:"NewNoticeItem" */ '@/views/Notice/NewNoticeItem')
const IsApply = () => import(/* webpackChunkName:"IsApply" */ '@/views/Apply/IsApply')
const ApplyView = () => import(/* webpackChunkName:"ApplyView" */ '@/views/Apply/ApplyView')
const BorrowApply = () => import(/* webpackChunkName:"BorrowApply" */ '@/views/Apply/BorrowApply')
const BacktrackApply = () => import(/* webpackChunkName:"BacktrackApply" */ '@/views/Apply/BacktrackApply')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      login: true
    },
    children: [
      {
        path: '/',
        name: 'HomeView',
        component: HomeIndex,
      },
      {
        path: 'book',
        name: 'BookView',
        component: BookView,
      },
      {
        path: 'newbook',
        name: 'NewBookItem',
        component: NewBookItem,
      },
      {
        path: 'user',
        name: 'UserView',
        component: UserView,
      },
      {
        path: 'newuser',
        name: 'NewUserItem',
        component: NewUserItem,
      },
      {
        path: 'notice',
        name: 'NoticeView',
        component: NoticeView,
      },
      {
        path: 'newnotice',
        name: 'NewNoticeItem',
        component: NewNoticeItem,
      },
      {
        path: 'apply',
        component: IsApply,
        children: [
          {
            path: '',
            name: 'ApplyView',
            component: ApplyView,
          },
          {
            path: 'borrow',
            name: 'BorrowApply',
            component: BorrowApply,
          },
          {
            path: 'backtrack',
            name: 'BacktrackApply',
            component: BacktrackApply,
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
