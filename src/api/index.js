import axios from 'axios'
import store from '../store/index.js'
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
http.interceptors.response.use(function(response) {
    return response
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
        return http.get('/projects/')
    },
    delProject(project_id) {
        return http.delete(`/projects/${project_id}`)
    },
    updateProject(project_id, params) {
        return http.patch(`/projects/${project_id}`, params)
    }
}
