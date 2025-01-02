interface IWindowData {
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
let windowData: IWindowData = {
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

export const getWindowData = (): IWindowData => {
  return windowData;
};

export const setWindowData = (data: IWindowData) => {
  windowData = {
    ...getWindowData(),
    ...data,
  };
  // console.log('windowData', windowData);
};
