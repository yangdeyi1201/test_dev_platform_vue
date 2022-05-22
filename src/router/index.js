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
    component: () => {return import('../views/login.vue')}
  },
  {
    path: '/allProjects',
    name: 'all',
    component: () => {return import('../views/allProjects.vue')}
  },
  {
    path: '/home',
    name: 'home',
    component: () => {return import('../views/home.vue')}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 设置路由全局前置拦截器: 每个路由访问前执行
router.beforeEach((to, from, next) => {
  const token = store.state.isAuthorization
  const names = routes.filter((value) => {return value.name !== undefined && value.name !== 'login'})
                      .map((value) => {return value.name})
  if (to.name === 'login') {
  //  如访问登录页, 直接下一步
    return next()
  }
  else if (names.includes(to.name) && !token) {
  //  访问非登录路由页+无token:直接跳转至登录页
    return next({name: 'login'})
  }
  else if (names.includes(to.name) && token) {
    // 访问非登录路由页+有token:可直接访问到非登录路由页(token校验问题后续通过vuex解决)
    return next()
  }
})

export default router
