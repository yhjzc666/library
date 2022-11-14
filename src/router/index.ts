import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import FrameView from '../views/FrameView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'frame',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: FrameView,
    children: [
      {
        path: "index",
        name: "index",
        meta: {
          isShow: true, 
          icon: "Setting",
          title:"首页"
        },
        component: () => import(/* webpackChunkName: "goods" */ '../views/IndexView.vue')
      }, {
        path: "user",
        name: "user",
        meta: {
          isShow: true,
          icon: "UserFilled",
          title:"用户列表"
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/UserView.vue')
      }, {
        path: "book",
        name: "book",
        meta: {
          isShow: true,
          icon: "List",
          title:"预约管理"
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/BookView.vue')
      }, {
        path: "seat",
        name: "seat",
        meta: {
          isShow: true,
          icon: "Stamp",
          title:"座位管理"
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/SeatView.vue')
      }, {
        path: "statistic",
        name: "statistic",
        meta: {
          isShow: true,
          icon: "Histogram",
          title:"统计数据"
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/StatisticsView.vue')
      }, {
        path: "safe",
        name: "safe",
        meta: {
          isShow: true,
          icon: "WarningFilled",
          title:"安全设置"
        },
        component: () => import(/* webpackChunkName: "user" */ '../views/SafeView.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
