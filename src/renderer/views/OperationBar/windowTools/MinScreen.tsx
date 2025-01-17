import React, { memo } from 'react';
import winUiEmitter from '@/renderer/ipcRenderer/mainWindow/winUiEmitter';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

/**
 * @description: 最小化
 */
const FullScreen = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <div onClick={winUiEmitter.minimize} ref={stopPropagationEleRef}>
      <i className="iconfont icon-zuixiaohua"></i>
    </div>
  );
});

export default FullScreen;
