import React, { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';

/**
 * @description: 最小化
 */
const FullScreen = memo(() => {
  return (
    <div onClick={windowUIEmitter.minApp}>
      <i className="iconfont icon-zuixiaohua"></i>
    </div>
  );
});

export default FullScreen;
