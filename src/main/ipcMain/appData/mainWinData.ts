interface IMainWindow {
  isFullScreen?: boolean;
  isMaximized?: boolean;
  isMinimized?: boolean;
  bounds?: IBounds;
}

interface IBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 *  主窗口数据
 */
let mainWindowData: IMainWindow = {
  isFullScreen: false,
  isMaximized: false,
  isMinimized: false,
  bounds: {
    width: 1200,
    height: 800,
    x: 0,
    y: 0,
  },
};

/**
 * 获取主窗口数据
 */
export const getMainWindowData = (): IMainWindow => {
  return mainWindowData;
};

/**
 * 存储主窗口数据
 */
export const setMainWindowData = (data: IMainWindow) => {
  mainWindowData = {
    ...getMainWindowData(),
    ...data,
  };
  // console.log('windowData', windowData);
};
