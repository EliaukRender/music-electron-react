import { memo } from 'react';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';
import { openMiniPlayer } from '@/renderer/ipcRenderer/miniPlayer/miniPlayerEmitter';

/**
 *  mini播放器入口按钮
 */
const MiniPlayer = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <div onClick={openMiniPlayer} ref={stopPropagationEleRef}>
      <i className="iconfont icon-mini-app"></i>
    </div>
  );
});

export default MiniPlayer;
