import { MessageUtil } from "@/components/Message";

/**
 * @description: 基于 响应状态码 处理不同的错误响应
 */
export const handleErrorByCode = (status: number) => {
  switch (status) {
    case 400:
      MessageUtil.ShowToast({ type: "error", message: "请求失败！请您稍后重试！" });
      break;
    case 401:
      MessageUtil.ShowToast({ type: "error", message: "登录失效！请您重新登录！" });
      break;
    case 403:
      MessageUtil.ShowToast({ type: "error", message: "当前账号无权限访问！" });
      break;
    case 404:
      MessageUtil.ShowToast({ type: "error", message: "您所访问的资源不存在！" });
      break;
    case 405:
      MessageUtil.ShowToast({ type: "error", message: "请求方式错误！请您稍后重试！" });
      break;
    case 408:
      MessageUtil.ShowToast({ type: "error", message: "请求超时！请您稍后重试！" });
      break;
    case 500:
      MessageUtil.ShowToast({ type: "error", message: "服务异常！" });
      break;
    case 502:
      MessageUtil.ShowToast({ type: "error", message: "网关错误！" });
      break;
    case 503:
      MessageUtil.ShowToast({ type: "error", message: "服务不可用！" });
      break;
    case 504:
      MessageUtil.ShowToast({ type: "error", message: "网关超时！" });
      break;
    default:
      MessageUtil.ShowToast({ type: "error", message: "请求失败！" });
  }
};
