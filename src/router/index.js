import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    // redirect: '/login',
    component: () => import('@/views/login/Login'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/lqfb',
    component: Layout,
    redirect: '/lqfb',
    children: [{
      path: '/',
      name: 'lqfb',
      component: () => import('@/views/lqfb/index')
    },{
      path: 'printMap',
      name: 'printMap',
      component: () => import('@/views/lqfb/printMap')
    }]
  },

]

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export default router
