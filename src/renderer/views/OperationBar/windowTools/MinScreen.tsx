import React, { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/rendererInteraction/windowUi';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

/**
 * @description: 最小化
 */
const FullScreen = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <div onClick={windowUIEmitter.minimize} ref={stopPropagationEleRef}>
      <i className="iconfont icon-zuixiaohua"></i>
    </div>
  );
});

export default FullScreen;
