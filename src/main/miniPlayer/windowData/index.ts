interface IMiniPlayerWindow {
  bounds: IBounds;
}

interface IBounds {
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 *  mini-player窗口数据
 */

let mainWindowData: IMiniPlayerWindow = {
  bounds: {
    width: 330,
    height: 290,
    x: 0,
    y: 0,
  },
};

/**
 * 获取mini-player窗口数据
 */
export const getMiniPlayerWinData = (): IMiniPlayerWindow => {
  return mainWindowData;
};

/**
 * 存储mini-player窗口数据
 */
export const setMiniPlayerWinData = (data: IMiniPlayerWindow) => {
  mainWindowData = {
    ...getMiniPlayerWinData(),
    ...data,
  };
  // console.log('windowData', windowData);
};
