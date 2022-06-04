import axios from 'axios'
import store from '../store/index.js'
import router from '../router/index.js'
import {URLSearchParams} from "core-js/modules/web.url-search-params.constructor";


// 创建 axios 请求实例
const http = axios.create({
    baseURL: 'http://47.112.233.130:8888',
    validateStatus: function (status) {
        return status < 500
    }
})

// 请求拦截器
http.interceptors.request.use(function(config) {
    if (config.url === '/users/login/' || config.url === '/users/register') {
        return config
    }
    else {
        const token = store.state.isAuthorization
        config.headers['Authorization'] = 'Bearer'+' '+token
        return config
    }
})

// 响应拦截器
http.interceptors.response.use(function (response) {
    if ([200, 201, 204].includes(response.status)) {
        return response
    }
    else if (response.status === 400) {
        store.dispatch('messageError', response.data).catch((e) => {console.log(e)})
        return response
    }
    else if (response.status === 401) {
        store.dispatch('messageError', response.data.detail).catch((e) => {console.log(e)})
        if (response.config.url !== '/users/login/') {
             router.push({name: 'login'}).catch((e) => {console.log(e)})
        } // token过期, 重定向至登录页
        return response
    }
    else if (response.status === 403) {
        store.dispatch('messageError', response.data.detail).catch((e) => {console.log(e)})
        return response
    }
    else if (response.status === 500) {
         store.dispatch('messageError', response.data).catch((e) => {console.log(e)})
        return response
    }
    else {
        store.dispatch('messageError', response.data).catch((e) => {console.log(e)})
        return response
    }
})

function convertToFormData(obj) {
    // 接口参数转为表单格式传递
    let params = new URLSearchParams()
    for (let key in obj) {
        params.append(key, obj[key])
    }
    return params
}

// 定义访问接口的方法
export default {
    login(params) {
        return http.post('/users/login/', params)
    },
    register(params) {
        return http.post('/users/register/', params)
    },
    // 项目列表相关接口
    getProjects() {
        // 获取项目列表
        return http.get('/projects/')
    },
    getProject(project_id) {
        // 获取项目
        return http.get(`/projects/${project_id}/`)
    },
    delProject(project_id) {
        // 删除项目
        return http.delete(`/projects/${project_id}/`)
    },
    updateProject(project_id, params) {
        // 修改项目
        return http.patch(`/projects/${project_id}/`, params)
    },
    addProject(params) {
        // 新增项目
        return http.post('/projects/', params)
    }
}
