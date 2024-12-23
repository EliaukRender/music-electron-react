import React, { memo } from 'react';
import { OperationBarStyles } from '@/renderer/views/OperationBar/styles/OperationBarStyles';
import Search from '@/renderer/views/OperationBar/components/Search';
import UserInfo from '@/renderer/views/OperationBar/components/UserInfo';
import Navigation from '@/renderer/views/OperationBar/components/Navigation';
import ChangeTheme from '@/renderer/views/OperationBar/windowTools/ChangeTheme';
import MinScreen from '@/renderer/views/OperationBar/windowTools/MinScreen';
import MaxScreen from '@/renderer/views/OperationBar/windowTools/MaxScreen';
import CloseApp from '@/renderer/views/OperationBar/windowTools/CloseApp';
import { useUpdateWindowPosition } from '@/renderer/hooks/useDragPosition';

/**
 * @description: 顶部操作栏区域
 */
const OperationBar: React.FC = () => {
  const { elementRef } = useUpdateWindowPosition();

  return (
    <OperationBarStyles ref={elementRef}>
      <div className="bar-left">
        <Navigation></Navigation>
        <Search></Search>
      </div>
      <div className="bar-right">
        {/* 用户信息 */}
        <UserInfo></UserInfo>
        {/* 主题切换 */}
        <ChangeTheme></ChangeTheme>
        {/* 最小化 */}
        <MinScreen></MinScreen>
        {/* 最大化 */}
        <MaxScreen></MaxScreen>
        {/* 关闭App */}
        <CloseApp></CloseApp>
      </div>
    </OperationBarStyles>
  );
};

export default memo(OperationBar);
