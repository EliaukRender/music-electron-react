import React, { memo, useState } from 'react';
import { ToolsStyles } from '@/renderer/views/OperationBar/styles/ToolsStyles';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';
import classNames from 'classnames';
import { usePreventDefault } from '@/renderer/hooks/usePreventDefault';

/**
 * @description: 最小化、最大化、退出APP
 */
const Tools: React.FC = () => {
  const [isMaxScreen, setIsMaxScreen] = useState(false);
  const { elementRef } = usePreventDefault();

  // 窗口最大化、退出最大化
  const handleMaxScreen = async () => {
    const res = await windowUIEmitter.maxApp();
    setIsMaxScreen(res);
  };

  return (
    <ToolsStyles ref={elementRef}>
      <i className="iconfont icon-pifu"></i>
      <i className="iconfont icon-shangchuan"></i>
      <i
        className="iconfont icon-zuixiaohua"
        onClick={windowUIEmitter.minApp}
      ></i>
      <i
        className={classNames(
          'iconfont',
          !isMaxScreen ? 'icon-zuidahua' : 'icon-exitfullscreen',
        )}
        onClick={handleMaxScreen}
      ></i>
      <i
        className="iconfont icon-guanbi"
        onClick={windowUIEmitter.closeApp}
      ></i>
    </ToolsStyles>
  );
};

export default memo(Tools);
