import React, { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/rendererInteraction/windowUi';

/**
 * @description: 最小化
 */
const FullScreen = memo(() => {
  return (
    <div onClick={windowUIEmitter.minimize}>
      <i className="iconfont icon-zuixiaohua"></i>
    </div>
  );
});

export default FullScreen;
