import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import installElementPlus from './plugins/element.js'
import api from './api/index.js'
import tools from './assets/js/tools.js'
import './assets/css/main.css'

const app = createApp(App).use(router).use(store)
installElementPlus(app)
app.config.globalProperties.$api = api
app.config.globalProperties.$tools = tools
app.mount('#app')