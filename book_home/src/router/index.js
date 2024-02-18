import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/Home/HomeView'
import HomeIndex from "@/views/Home/HomeIndex"
import LoginView from "@/views/Login/LoginView"
import EnrolView from "@/views/Login/EnrolView"

const BookView = () => import(/* webpackChunkName:"BookView" */  '@//views/Book/BookView')
const BookItem = () => import(/* webpackChunkName:"BookItem" */  '@//views/Book/BookItem')
const NoticeView = () => import(/* webpackChunkName:"NoticeView" */  '@//views/Notice/NoticeView')
const NoticeItem = () => import(/* webpackChunkName:"NoticeItem" */  '@//views/Notice/NoticeItem')
const UserView = () => import(/* webpackChunkName:"UserView" */  '@//views/User/UserView')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'HomeView',
        component: HomeIndex
      },
      {
        path: 'book',
        name: 'BookView',
        component: BookView,
      },
      {
        path: 'book/:id',
        name: 'BookItem',
        component: BookItem,
      },
      {
        path: 'notice',
        name: 'NoticeView',
        component: NoticeView
      },
      {
        path: 'notice/:id',
        name: 'NoticeItem',
        component: NoticeItem,
      },
      {
        path: 'user',
        name: 'UserView',
        component: UserView,
        meta: {
          login: true
        },
      },
    ]
  },
  {
    path: '/login',
    name: "LoginView",
    component: LoginView,
  },
  {
    path: '/enrol',
    name: "EnrolView",
    component: EnrolView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
