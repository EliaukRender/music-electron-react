import { memo } from 'react';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';
import windowUiEmitter from '@/renderer/ipcRenderer/mainWindow/windowUi';

/**
 *  mini播放器入口按钮
 */
const MiniPlayerEnter = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <div
      onClick={() => windowUiEmitter.showHiddenMiniPlayer()}
      ref={stopPropagationEleRef}
    >
      <i className="iconfont icon-mini-app"></i>
    </div>
  );
});

export default MiniPlayerEnter;
