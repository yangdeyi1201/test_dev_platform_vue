import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'
import {ElMessageBox} from 'element-plus'

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
    redirect: '/home/project',
    meta: {
      'name': '首页'
    },
    component: () => {return import('../views/home.vue')},
    children: [
      {
        path: '/home/project',
        name:'project',
        component: () => {return import('../views/project.vue')},
        meta: {
          'name': '项目管理'
        }
      },
      {
        path: '/home/interface',
        name: 'interface',
        component: () => {return import('../views/interface.vue')},
        meta: {
          'name': '接口管理'
        }
      },
      {
        path: '/home/case',
        name: 'case',
        component: () => {return import('../views/case.vue')},
        meta: {
          'name': '用例管理'
        }
      },
      {
        path: '/home/env',
        name: 'env',
        component: () => {return import('../views/env.vue')},
        meta: {
          'name': '环境管理'
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => {return import('../views/page404.vue')}
  },
  {
    // 在路由数组最后一项: 正则匹配任意路径并重定向至 /404 路由
    path: '/:pathMatch(.*)*',
    redirect: '/404',
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

  if (to.meta['name']) {
    // 如为点击项目首页导航菜单进行路由跳转->添加导航菜单名至标签列表(如标签列表中未存在)
    store.commit('appendTag', to.meta['name'])
  }

  if (to.name === 'login') {
  //  如访问登录页, 直接下一步
    return next()
  }
  else if (names.includes(to.name) && !token) {
  //  访问非登录页+无token:提示并跳转至登录页
    ElMessageBox.alert(
        '会话已经失效, 请重新登录',
        '提示',
        {confirmButtonText: '确定',
          type: 'warning',
          callback: () => {next({name: 'login'})}
        }
    ).catch((e) => {console.log(e)})
  }
  else if (names.includes(to.name) && token) {
    // 访问非登录路由页+有token:可直接访问到非登录路由页
    return next()
  }
  else if (to.path === '/404') { // 通过路由路径判断
    // 路由 404 配置
    return next()
  }
})

export default router
