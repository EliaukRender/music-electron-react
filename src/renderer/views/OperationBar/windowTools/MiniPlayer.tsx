import { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/rendererInteraction/windowUi';

/**
 * @description: mini播放器入口
 */
const MiniPlayer = memo(() => {
  return (
    <div onClick={windowUIEmitter.miniPlayer}>
      <i className="iconfont icon-mini-app"></i>
    </div>
  );
});

export default MiniPlayer;
