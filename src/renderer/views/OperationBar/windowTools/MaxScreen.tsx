import React, { memo, useState } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';
import classNames from 'classnames';

/**
 * @description: 最大化、退出最大化
 */
const MaxScreen = memo(() => {
  const [isMaxScreen, setIsMaxScreen] = useState(false);

  // 窗口最大化、退出最大化
  const handleMaxScreen = async () => {
    const res = await windowUIEmitter.maxApp();
    setIsMaxScreen(res);
  };
  return (
    <div onClick={handleMaxScreen}>
      <i
        className={classNames(
          'iconfont',
          isMaxScreen ? 'icon-zuidahua1' : 'icon-zuidahua',
        )}
      ></i>
    </div>
  );
});

export default MaxScreen;
