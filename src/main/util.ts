/* eslint import/prefer-default-export: off */
import { URL, format } from 'url';
import path from 'path';
import { BrowserWindow } from 'electron';

const url = require('url');

/**
 * @description: 窗口获取当前加载的页面资源的路径
 * @param htmlFileName 加载index.html入口文件
 * @param routePath 加载指定路由的页面
 */
const HtmlFileName = 'index.html';
export function resolveHtmlPath(routePath?: string) {
  // 开发
  if (process.env.NODE_ENV === 'development') {
    const port = process.env.PORT || 1212;
    const devUrl = new URL(`http://localhost:${port}`);
    routePath?.length && (devUrl.hash = routePath);
    console.log('---开发环境下 窗口加载资源的路径是---', devUrl.href);
    return devUrl.href;
  }
  // 生产
  const urlOption = {
    protocol: 'file:',
    slashes: true,
    pathname: path.resolve(__dirname, '../renderer/', HtmlFileName),
    hash: '',
  };
  if (routePath?.length) {
    return format({ ...urlOption, hash: routePath.slice(1) });
  }
  return format(urlOption);
}

/**
 * @description: 创建窗口
 * @param options 配置参数
 */
export const createBrowserWindow = (options: any) => {
  return new BrowserWindow(options);
};
