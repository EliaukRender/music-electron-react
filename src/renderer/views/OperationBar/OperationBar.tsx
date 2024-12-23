import React, { memo, useEffect, useRef } from 'react';
import { OperationBarStyles } from '@/renderer/views/OperationBar/styles/OperationBarStyles';
import Search from '@/renderer/views/OperationBar/components/Search';
import UserInfo from '@/renderer/views/OperationBar/components/UserInfo';
import updatePositionEmitter from '@/renderer/ipcRenderer/updatePositionEmitter';
import Navigation from '@/renderer/views/OperationBar/components/Navigation';
import ChangeTheme from '@/renderer/views/OperationBar/windowTools/ChangeTheme';
import MinScreen from '@/renderer/views/OperationBar/windowTools/MinScreen';
import MaxScreen from '@/renderer/views/OperationBar/windowTools/MaxScreen';
import CloseApp from '@/renderer/views/OperationBar/windowTools/CloseApp';

/**
 * @description: 顶部操作栏区域
 */
const OperationBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = barRef.current;
    if (!element) return;

    let dragging = false;
    let clientX = 0;
    let clientY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      document.addEventListener('mousemove', handleMouseMove);
      dragging = true;
      clientX = e.clientX;
      clientY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      if (!dragging) return;
      const x = e.screenX - clientX;
      const y = e.screenY - clientY;
      updatePositionEmitter.dragApp({ x, y });
    };

    const handleMouseUp = () => {
      dragging = false;
      clientX = 0;
      clientY = 0;
      document.removeEventListener('mousemove', handleMouseMove);
    };

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  });

  return (
    <OperationBarStyles ref={barRef}>
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
