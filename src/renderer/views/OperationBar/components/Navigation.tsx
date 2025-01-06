import { NavigateStyles } from '@/renderer/views/OperationBar/styles/NavigationStyles';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';
import React, { memo, useRef } from 'react';

/**
 * @description: 左右导航组件
 */
const Navigation: React.FC = () => {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <NavigateStyles ref={stopPropagationEleRef}>
      <i className="iconfont icon-zuojiantou"></i>
      <i className="iconfont icon-youjiantou"></i>
    </NavigateStyles>
  );
};

export default memo(Navigation);
