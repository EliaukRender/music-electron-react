/* eslint import/prefer-default-export: off */
import { URL, format } from 'url';
import path from 'path';
import { app, BrowserWindow } from 'electron';

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
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  return new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1100,
    minHeight: 700,
    frame: false, // 隐藏窗口的工具栏
    transparent: true, // 窗口是否透明
    icon: getAssetPath('icon.png'),
    fullscreen: false,
    webPreferences: {
      nodeIntegration: true,
      /* 预加载脚本 */
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
    ...options,
  });
};
