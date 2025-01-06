import { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/rendererInteraction/windowUi';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

/**
 * @description: mini播放器入口
 */
const MiniPlayer = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <div onClick={windowUIEmitter.miniPlayer} ref={stopPropagationEleRef}>
      <i className="iconfont icon-mini-app"></i>
    </div>
  );
});

export default MiniPlayer;
