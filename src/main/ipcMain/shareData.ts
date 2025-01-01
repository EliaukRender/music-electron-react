/**
 * 主线程共享数据
 */
interface IShareData {
  isFullScreen?: boolean;
  isMaximized?: boolean;
  isMinimized?: boolean;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

let shareData: IShareData = {
  isFullScreen: false,
  isMaximized: false,
  isMinimized: false,
  x: 0,
  y: 0,
  width: 1200,
  height: 800,
};

export const getShareData = (): IShareData => {
  return shareData;
};

export const setShareData = (data: IShareData) => {
  shareData = {
    ...getShareData(),
    ...data,
  };
  console.log('shareData', shareData);
};
