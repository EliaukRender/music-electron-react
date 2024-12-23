import React, { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';

/**
 * @description: 关闭app按钮
 * @param
 * @return
 */
const CloseApp = memo(() => {
  return (
    <div>
      <i
        className="iconfont icon-guanbi"
        onClick={windowUIEmitter.closeApp}
      ></i>
    </div>
  );
});

export default CloseApp;
