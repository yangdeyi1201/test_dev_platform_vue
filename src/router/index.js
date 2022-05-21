import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/allProjects',
    name: 'all',
    component: () => import('../views/allProjects.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 设置路由全局前置拦截器: 每个路由访问前执行
router.beforeEach((to, from, next) => {
  const token = store.state.isAuthorization
  if (to.name === 'login') {
  //  如访问登录页, 直接下一步
    return next()
  }
  else if (to.name === 'all' && !token) {
  //  访问项目列表首页无token:直接跳转至登录页
    return next({name: 'login'})
  }
  else if (to.name === 'all' && token) {
    // 访问项目列表首页有token:可直接访问到项目列表首页(token校验问题后续通过vuex解决)
    return next()
  }
})

export default router