/* eslint import/prefer-default-export: off */
import { URL } from 'url';
import path from 'path';
import { BrowserWindow } from 'electron';

/**
 * @description: 窗口获取当前加载的页面资源的路径
 * @param htmlFileName 加载index.html入口文件
 * @param routePath 加载指定路由的页面
 */
export function resolveHtmlPath(htmlFileName: string, routePath?: string) {
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    if (!routePath) {
      url.pathname = htmlFileName;
    } else {
      url.hash = routePath;
    }
    console.log('---开发环境下 窗口加载资源的路径是---', url.href);
    return url.href;
  }
  // 生产环境：返回本地文件路径，处理路由路径
  const filePath = `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
  // 如果有路由路径，则附加到 URL 后
  return routePath ? `${filePath}/#${routePath}` : filePath;
}

/**
 * @description: 创建窗口
 */
export const createBrowserWindow = (options: any) => {
  return new BrowserWindow(options);
};
