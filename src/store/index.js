import { createStore } from 'vuex'
import {ElMessage} from 'element-plus'

export default createStore({
  state: {
    // 存放全局数据
    'isAuthorization': false,
    'username': null,
    'projectInfo': null,
    'messageDuration': 2000
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
