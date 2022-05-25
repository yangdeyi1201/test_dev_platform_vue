import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'

function getAllNames(routes) {
  // 递归获取路由列表所有 name 字段值存至一个数组
  const route_names = [] // 调用时才创建出空数组用以存放

  function recursion(routes) {
    // 路由列表递归逻辑
    for (const route of routes) {
      if (route.hasOwnProperty('name')) {
        route_names.push(route.name)
      }
      if (route.hasOwnProperty('children')) {
        recursion(route.children)
      }
    }
    return route_names
  }

  return recursion(routes)
}

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
    component: () => {return import('../views/home.vue')},
    children: [
      {
        path: '/home/project',
        name:'project',
        component: () => {return import('../views/project.vue')},
      },
      {
        path: '/home/interface',
        name: 'interface',
        component: () => {return import('../views/interface.vue')}
      },
      {
        path: '/home/case',
        name: 'case',
        component: () => {return import('../views/case.vue')}
      },
      {
        path: '/home/env',
        name: 'env',
        component: () => {return import('../views/env.vue')},
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 获取路由列表所有 name 值
const filter_routes = routes.filter((value) => {return value.name !== undefined && value.name !== 'login'})
const names = getAllNames(filter_routes)

// 设置路由全局前置拦截器: 每个路由访问前执行
router.beforeEach((to, from, next) => {
  const token = store.state.isAuthorization

  if (to.name === 'login') {
  //  如访问登录页, 直接下一步
    return next()
  }
  else if (names.includes(to.name) && !token) {
  //  访问非登录页+无token:直接跳转至登录页
    return next({name: 'login'})
  }
  else if (names.includes(to.name) && token) {
    // 访问非登录路由页+有token:可直接访问到非登录路由页
    return next()
  }
})

export default router
