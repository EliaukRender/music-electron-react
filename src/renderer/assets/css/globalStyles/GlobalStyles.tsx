import React, { memo } from 'react';
import { CustomModalStyles } from '@/renderer/assets/css/globalStyles/CustomModalStyles';
import { ResetAntdCmpStyles } from '@/renderer/assets/css/globalStyles/ResetAntdCmpStyles';
import { CustomPopoverStyles } from '@/renderer/assets/css/globalStyles/CustomPopoverStyles';

/**
 * 统一引入管理全局样式
 */
const GlobalStyles = memo((props) => {
  return (
    <div>
      {/*  antd-modal相关的弹窗样式 */}
      <CustomModalStyles></CustomModalStyles>
      {/* 重置antd部分组件的样式 */}
      <ResetAntdCmpStyles></ResetAntdCmpStyles>
      {/*  antd-popover组件样式 */}
      <CustomPopoverStyles></CustomPopoverStyles>
    </div>
  );
});

export default GlobalStyles;
