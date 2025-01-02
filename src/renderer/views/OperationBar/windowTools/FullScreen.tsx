import { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';

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
        onClick={windowUIEmitter.fullScreen}
      ></i>
    </div>
  );
});

export default FullScreen;
