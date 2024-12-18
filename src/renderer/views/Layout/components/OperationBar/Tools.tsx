import React, { memo } from 'react';
import { ToolsStyles } from '@/renderer/views/Layout/components/styles/ToolsStyles';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';

/**
 * @description: 操作栏中的工具
 */
const Tools: React.FC = () => {
  return (
    <ToolsStyles>
      <i className="iconfont icon-pifu"></i>
      <i className="iconfont icon-shangchuan"></i>
      <i
        className="iconfont icon-zuixiaohua"
        onClick={windowUIEmitter.minApp}
      ></i>
      <i
        className="iconfont icon-zuidahua"
        onClick={windowUIEmitter.maxApp}
      ></i>
      <i
        className="iconfont icon-quanping"
        onClick={windowUIEmitter.fullApp}
      ></i>
      <i
        className="iconfont icon-guanbi"
        onClick={windowUIEmitter.closeApp}
      ></i>
    </ToolsStyles>
  );
};

export default memo(Tools);
