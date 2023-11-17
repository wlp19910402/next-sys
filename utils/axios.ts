'use client'
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
// @ts-ignore
// import { koiMsgError } from '@/utils/koi.ts'
// import { getToken } from '@/utils/storage.ts'
import useErrorStore from '@/store/layout/error'
import { strict } from 'assert'

// import errorStatus from "@/utils/errorStatus.ts"
// axios配置
console.log(process)
const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15000,
}
// 返回值类型
export interface Result<T = any> {
  code: number
  msg: string
  data: T
}
// 只有请求封装用的PackAxios，方便简写
class PackAxios {
  private instance: AxiosInstance
  // 初始化
  constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.instance = axios.create(config)
    // 配置拦截器
    this.interceptors()
  }
  // 拦截器
  private interceptors() {
    // 请求发送之前的拦截器：携带token
    this.instance.interceptors.request.use(
      (config: any) => {
        // 获取token
        const token = localStorage.getItem('autoToken')
        if (token) {
          config.headers!['Auth-Token'] = token
        }
        return config
      },
      (error: any) => {
        error.data = {}
        error.data.msg = '服务器异常，请联系管理员🐰'
        return error
      }
    )
    // 请求返回之后的拦截器：数据或者状态
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        let status = res.status // 后端返回数据状态
        // let errorStore = useErrorStore()
        // errorStore.error = ''

        // if (res.config.url === '/PurchaseEventController/selectPage') {
        //   res.data = { code: 403, msg: '222', data: '错啦' }
        // }
        // 获取错误信息
        // const msg = errorStatus[res.data.status || 200] || res.data.msg + "🐰" || errorStatus['default']
        if (status == 200) {
          // 这里的后端可能是code OR status 和 msg OR message需要看后端传递的是什么？
          if (
            res.data.code == 102 &&
            window.location.pathname !==
              import.meta.env.VITE_APP_ROUTER_URL + 'login'
          ) {
            console.log('拒绝访问,当前账户未登录,请先登录')
            localStorage.removeItem('authToken')
            return
          } else if (
            res.data.code == 102 &&
            window.location.pathname ==
              import.meta.env.VITE_APP_ROUTER_URL + 'login'
          ) {
            localStorage.removeItem('authToken')
            return
          } else {
            switch (res.data.code) {
              case 403:
                // errorStore.error = '403'
                break
              case 404:
                // errorStore.error = '404'
                break
              case 500:
                // errorStore.error = '500'
                break
            }
            return res.data
          }
        } else {
          console.log(res.data.msg + '🐰' || '服务器偷偷跑到火星去玩了🐰')
          return Promise.reject(
            res.data.msg + '🐰' || '服务器偷偷跑到火星去玩了🐰'
          ) // 可以将异常信息延续到页面中处理，使用try{}catch(error){};
        }
      },
      (error: any) => {
        // 处理网络错误，不是服务器响应的数据
        error.data = {}
        // let errorStore = useErrorStore()
        // errorStore.error = ''
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.data.msg = '错误请求🐰'
              console.log(error.data.msg)
              break
            case 401:
              error.data.msg = '未授权，请重新登录🐰'
              console.log(error.data.msg)
              break
            case 403:
              error.data.msg = '对不起，您没有权限访问🐰'
              // errorStore.error = '403'
              console.log(error.data.msg)
              break
            case 404:
              // errorStore.error = '404'
              error.data.msg = '请求错误,未找到请求路径🐰'
              console.log(error.data.msg)
              break
            case 405:
              error.data.msg = '请求方法未允许🐰'
              console.log(error.data.msg)
              break
            case 408:
              error.data.msg = '请求超时🐰'
              console.log(error.data.msg)
              break
            case 500:
              // errorStore.error = '500'
              error.data.msg = '服务器又偷懒了，请重试🐰'
              console.log(error.data.msg)
              break
            case 501:
              error.data.msg = '网络未实现🐰'
              console.log(error.data.msg)
              break
            case 502:
              error.data.msg = '网络错误🐰'
              console.log(error.data.msg)
              break
            case 503:
              error.data.msg = '服务不可用🐰'
              console.log(error.data.msg)
              break
            case 504:
              error.data.msg = '网络超时🐰'
              console.log(error.data.msg)
              break
            case 505:
              error.data.msg = 'http版本不支持该请求🐰'
              console.log(error.data.msg)
              break
            default:
              error.data.msg = `连接错误${error.response.status}`
              console.log(error.data.msg)
          }
        } else {
          if (
            error.code == 'ECONNABORTED' ||
            error.message.includes('timeout')
          ) {
            // errorStore.error = 'timeout'
            error.data.msg = '抱歉，请求网络超时哦~'
          } else {
            // errorStore.error = '500'
            error.data.msg = '连接到服务器失败🐰'
          }
          console.log(error.data.msg)
        }
        return Promise.reject(error) // 将错误返回给 try{} catch(){} 中进行捕获，就算不进行捕获，上方 res.data.status != 200也会抛出提示。
      }
    )
  }
  // Get请求
  get<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.get(url, { params })
  }
  // Post请求
  post<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.post(url, data)
  }
  // Put请求
  put<T = Result>(url: string, data?: object): Promise<T> {
    return this.instance.put(url, data)
  }
  // Delete请求
  delete<T = Result>(url: string): Promise<T> {
    return this.instance.delete(url)
  }
  // 图片上传
  upload<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.post(url, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
  // 获取接口返回数据类型是blob
  getBlob<T = Result>(url: string, params?: object): Promise<T> {
    return this.instance.get(url, {
      responseType: 'blob',
      params,
    })
  }
}
export default new PackAxios(config)
