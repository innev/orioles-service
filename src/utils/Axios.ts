import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export default class Axios {
  private instance: AxiosInstance;
  private tokenStoreKey: string;

  constructor(baseURL: string = '', localStoreKey: string = 'orioles') {
    this.tokenStoreKey = `${localStoreKey}.token`;

    this.instance = axios.create({
      baseURL,
      timeout: 10000, // 设置请求超时时间
      responseType: 'json',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
      }
    });

    // 请求拦截器
    this.instance.interceptors.request.use(config => {
      // 在请求发送之前可以对请求进行一些处理，例如添加请求头等
      const token = this._getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
      (error: AxiosError) => {
        // 请求错误时的处理
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 对响应数据进行处理
        return response.data;
      },
      (error: AxiosError) => {
        // 对响应错误进行处理
        return Promise.reject(error);
      }
    );
  }

  private _getToken(): string {
    let token: string = '';
    if (typeof window !== 'undefined') {
      token = window.localStorage.getItem(this.tokenStoreKey) as string;
    } else if (typeof global !== 'undefined') {
      // token = global.AsyncStorage.getItem(this.tokenStoreKey);
      token = "";
    }
    return token;
  }

  // 发送GET请求
  public get(url: string, params: object = {}): Promise<any> {
    return this.instance.get(url, { params });
  }

  // 发送POST请求
  public post(url: string, data: object = {}): Promise<any> {
    return this.instance.post(url, data);
  }

  // 发送PUT请求
  public put(url: string, data: object = {}): Promise<any> {
    return this.instance.put(url, data);
  }

  // 发送DELETE请求
  public delete(url: string): Promise<any> {
    return this.instance.delete(url);
  }
};