import axios, { AxiosRequestConfig, AxiosInstance, AxiosHeaders } from "axios";
import config from '@/config'
export class Request {
    private baseConfig: AxiosRequestConfig = {
        baseURL: config.domain,//基础url路径
        headers: {},
        timeout: 9000// 相应时间
    }
    // axios 实例
    private instance: AxiosInstance = axios.create(this.baseConfig);
    public constructor() {
        this.setReqInterceptors();
        this.setResInterceptors();
    }
    //设置请求头方法
    public setHeader = (headers: any) => {
        this.baseConfig.headers = { ...this.baseConfig.headers, ...headers };
        this.instance = axios.create(this.baseConfig);
        this.setReqInterceptors();
        this.setResInterceptors();
    }
    //  请求拦截器
    private setReqInterceptors = () => {
        this.instance.interceptors.request.use(
            config => config,
            err => {
                return Promise.reject(err)
            })
    }
    // 相应拦截器
    private setResInterceptors = () => {
        this.instance.interceptors.response.use(
            res => {
                const { code, data, mes } = res.data;
                if (code === 200) {
                    return data
                }
                return Promise.reject(res)
            },
            err => {
                return Promise.reject(err)
            }
        )
    }
    // 定义get请求
    public get = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> => this.instance({
        ...config,
        ...{ url, method: 'get', params: data }
    })
    //post  请求
    public post = (url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> => this.instance({
        ...{ url, method: 'post', params: data },
        ...config
    })
}
export default new Request()