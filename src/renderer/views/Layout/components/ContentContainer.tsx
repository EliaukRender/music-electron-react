import React, { memo } from 'react';
import { ContentContainerStyles } from '@/renderer/views/Layout/styles/ContentContainerStyles';
import { Outlet } from 'react-router-dom';

/**
 * @description: 动态显示内容的区域
 */
const ContentContainer = () => {
  return (
    <ContentContainerStyles>
      {/* 嵌套路由占位 */}
      <Outlet></Outlet>
    </ContentContainerStyles>
  );
};

export default memo(ContentContainer);
