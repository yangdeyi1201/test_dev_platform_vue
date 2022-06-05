import { createStore } from 'vuex'
import {ElMessage} from 'element-plus'
import menus from '../components/menu.js'
import router from '../router/index.js'

export default createStore({
  state: {
    // 存放全局数据
    'isAuthorization': false,
    'username': null,
    'projectInfo': null,
    'messageDuration': 2000,
    'tags': []
  },
  getters: {
    //  存放全局计算属性
  },
  mutations: {
    // 定义修改全局 state 数据的方法, 只能是同步函数
    'updateState': function(state, item) {
      // 修改单个全局 state 数据: 传入单个对象
      state[item.name] = item.value
    },
    'updateStates': function(state, items) {
      // 一次性修改多个全局 state 数据: 传入一个数组（包含多个对象）
      for (const item of items) {
        state[item.name] = item.value
      }
    },
    'appendTag': function(state, tagName) {
      // 单击项目首页导航菜单->添加导航菜单名至标签列表(如标签列表中未存在)
      if (!state.tags.includes(tagName)) {
        state.tags.push(tagName)
      }
    },
    'removeTag': function(state, tagName) {
      // 关闭标签
      const removeIndex = state.tags.findIndex((value) => {return value === tagName})
      if (removeIndex === state.tags.length - 1) { // 关闭末尾标签->路由跳转至上一标签对应路由
        if (state.tags.length > 1) { // 只剩一个标签时不允许关闭
          state.tags.splice(removeIndex, 1)
          const precedingTagName = state.tags[state.tags.length - 1]
          const precedingPathname = menus.find((value) => {return value.name === precedingTagName}).pathname
          router.push({name: precedingPathname}).catch((e) => {console.log(e)})
        }
      }
      else {
        state.tags.splice(removeIndex, 1)
      }
  }
  },
  actions: {
    // 定义全局方法, actions 中的方法不能直接修改全局 state 数据, 需要使用 context.commit(mutations 中方法名)
    // 同步/异步函数均支持
    messageSuccess(context, message) {
      ElMessage({
        type: 'success',
        message: message,
        duration: this.state.messageDuration,
        center: true
      })
    },
    messageError(context, message) {
      ElMessage({
        type: 'error',
        message: message,
        duration: this.state.messageDuration,
        center: true
      })
    },
    messageInfo(context, message) {
      ElMessage({
        type: 'info',
        message: message,
        duration: this.state.messageDuration,
        center: true
      })
    },
    messageWarning(context, message) {
      ElMessage({
        type: 'warning',
        message: message,
        duration: this.state.messageDuration,
        center: true
      })
    }
  },
  modules: {
  }
})
