import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { AxiosCanceler } from '@/renderer/api/helper/axiosCancel';
import { ResultEnum } from '@/renderer/api/constant/config';
// import { handleErrorByCode } from '@/renderer/api/helper/checkErrorCode';
import MessageToast from '@/renderer/components/MessageToast';
import { useDispatch } from 'react-redux';
import { setToken } from '@/renderer/store/modules/userReducer';
import store from '@/renderer/store/index';
import { ResultData } from '@/renderer/store/interface';

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  loading?: boolean; // 是否显示loading
  cancel?: boolean; // 是否取消请求
}

// 请求配置
const baseConfig = {
  baseURL: '/blog', // 请求根路径
  timeout: 1000 * 30, // 超时时间
};

const axiosCanceler = new AxiosCanceler();

// axios请求类
class RequestHttp {
  service: AxiosInstance;

  // eslint-disable-next-line @typescript-eslint/no-shadow
  public constructor(baseConfig: AxiosRequestConfig) {
    this.service = axios.create(baseConfig);

    /**
     * @description: 请求拦截器
     */
    this.service.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        // 1.重复请求不需要取消，在api服务中通过指定第三个参数: { cancel: false }来控制
        // config.cancel ?? (config.cancel = true);
        // config?.cancel && axiosCanceler.addPending(config);
        // 2.设置token在请求头中
        if (config.headers && typeof config.headers.set === 'function') {
          config.headers.set('token', store.getState().user.token);
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
    );

    /**
     * @description: 响应拦截器
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;
        // const userStore = useUserStore();
        axiosCanceler.removePending(config);
        // 登录失效
        if (data.code === ResultEnum.OVERDUE) {
          const dispatch = useDispatch();
          dispatch(setToken(''));
          MessageToast.error('登录过期，请重新登录');
          return Promise.reject(data);
        }
        // 全局错误信息拦截（这个位置可以根据项目情况补充或修改）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          MessageToast.error(data?.message || '接口请求错误');
          return Promise.reject(data);
        }
        // 成功请求
        return data;
      },
      (error) => {
        return handleResError(error);
      },
    );
  }

  /**
   * @description 请求方法
   */
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }

  post<T>(
    url: string,
    params?: object | string,
    _object = {},
  ): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
}

export default new RequestHttp(baseConfig);

/**
 * @description: 处理响应拦截器中的响应错误
 */
const handleResError = async (error: AxiosError) => {
  const { response } = error;
  // 请求超时 && 网络错误单独判断，没有response
  if (error.message.indexOf('timeout') !== -1) {
    MessageToast.error('请求超时！请您稍后重试');
  }
  if (error.message.indexOf('Network Error') !== -1) {
    MessageToast.error('网络错误！请您稍后重试');
  }
  // 根据服务器响应的错误状态码，做不同的处理
  if (response) {
    // handleErrorByCode(response.status);
  }
  // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
  if (!window.navigator.onLine) {
    //
  }
  return Promise.reject(error);
};
