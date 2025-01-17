import { memo, useCallback } from 'react';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';
import winUiEmitter from '@/renderer/ipcRenderer/mainWindow/winUiEmitter';

/**
 *  mini播放器入口按钮
 */
const MiniPlayerEnter = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();

  const clickMini = useCallback(() => {
    winUiEmitter.updateMiniPlayerData();
    winUiEmitter.showHiddenMiniPlayer();
  }, []);

  return (
    <div onClick={() => clickMini()} ref={stopPropagationEleRef}>
      <i className="iconfont icon-mini-app"></i>
    </div>
  );
});

export default MiniPlayerEnter;
