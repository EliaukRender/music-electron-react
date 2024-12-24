/**
 * @description：请求配置
 */
export enum ResultEnum {
  SUCCESS = 200, // 接口请求成功
  ERROR = 500,
  OVERDUE = 401, // 登录失效
  TIMEOUT = 30000, // 超时
  TYPE = 'success',
}
