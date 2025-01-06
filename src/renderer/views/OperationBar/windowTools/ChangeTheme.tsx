/**
 *  主题切换入口
 */
import React, { memo } from 'react';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

const ChangeTheme: React.FC = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <div ref={stopPropagationEleRef}>
      <i className="iconfont icon-pifu"></i>
    </div>
  );
});

export default ChangeTheme;
