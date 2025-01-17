import { memo } from 'react';
import winUiEmitter from '@/renderer/ipcRenderer/mainWindow/winUiEmitter';

interface IProps {
  isFullScreen: boolean;
}

/**
 * @description: APP全屏
 */
const FullScreen = memo(({ isFullScreen }: IProps) => {
  return (
    <div>
      <i
        title="全屏"
        className={`iconfont icon-${isFullScreen ? 'tuichuquanping' : 'quanping'}`}
        onClick={winUiEmitter.fullScreen}
      ></i>
    </div>
  );
});

export default FullScreen;
