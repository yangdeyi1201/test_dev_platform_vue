import { createStore } from 'vuex'
import {ElMessage, ElMessageBox} from 'element-plus'

export default createStore({
  state: {
    'isAuthorization': false,
    'messageDuration': 1500
  },
  getters: {
  },
  mutations: {
    updateState(state, items) {
      state[items.name] = items.value
    }
  },
  actions: {
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
    }
  },
  modules: {
  }
})
