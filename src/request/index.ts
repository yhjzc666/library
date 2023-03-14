import axios from 'axios'

// 处理  类型“AxiosResponse<any, any>”上不存在属性“errorinfo”。ts(2339) 脑壳疼！关键一步。
declare module "axios" {
    interface AxiosResponse<T = any> {
      errorinfo: null;
      // 这里追加你的参数
    }
    export function create(config?: AxiosRequestConfig): AxiosInstance;
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL: '/api', // 所有的请求地址前缀部分
    timeout: 60000, // 请求超时时间毫秒
    withCredentials: true, // 异步请求携带cookie
    headers: {
        // 设置后端需要的传参类型
        'Content-Type': 'application/json;charset=utf-8',
        // 'token': 'your token',
        // 'X-Requested-With': 'XMLHttpRequest',
    },
})
//请求拦截
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})

//响应拦截
service.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code == 200 || code == 300 || code == 400) {
        return res.data
    }
    return Promise.reject(res.data)
}, (err) => {
    console.log(err);

})
export default service