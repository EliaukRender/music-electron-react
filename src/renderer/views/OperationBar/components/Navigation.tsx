import { NavigateStyles } from '@/renderer/views/OperationBar/styles/NavigationStyles';
import { useForbidMouseDown } from '@/renderer/hooks/useForbidMouseDown';
import React, { memo, useRef } from 'react';

/**
 * @description: 左右导航组件
 */
const Navigation: React.FC = () => {
  const { forbidMouseDownEleRef } = useForbidMouseDown();

  return (
    <NavigateStyles ref={forbidMouseDownEleRef}>
      <i className="iconfont icon-zuojiantou"></i>
      <i className="iconfont icon-youjiantou"></i>
    </NavigateStyles>
  );
};

export default memo(Navigation);
