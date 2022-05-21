import { createStore } from 'vuex'

export default createStore({
  state: {
    'isAuthorization': false
  },
  getters: {
  },
  mutations: {
    updateState(state, items) {
      state[items.name] = items.value
    }
  },
  actions: {
  },
  modules: {
  }
})
