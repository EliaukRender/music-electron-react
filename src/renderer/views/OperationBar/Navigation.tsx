import { NavigateStyles } from '@/renderer/views/OperationBar/styles/NavigationStyles';
import { usePreventDefault } from '@/renderer/hooks/usePreventDefault';
import React, { memo, useRef } from 'react';

/**
 * @description: 左右导航组件
 */
const Navigation: React.FC = () => {
  const { elementRef } = usePreventDefault();

  return (
    <NavigateStyles ref={elementRef}>
      <i className="iconfont icon-zuojiantou"></i>
      <i className="iconfont icon-youjiantou"></i>
    </NavigateStyles>
  );
};

export default memo(Navigation);
