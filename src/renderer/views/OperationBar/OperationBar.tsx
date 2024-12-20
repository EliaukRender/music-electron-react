import React, { memo, useEffect, useRef } from 'react';
import { OperationBarStyles } from '@/renderer/views/OperationBar/styles/OperationBarStyles';
import Search from '@/renderer/views/OperationBar/Search';
import UserInfo from '@/renderer/views/OperationBar/UserInfo';
import Tools from '@/renderer/views/OperationBar/Tools';
import updatePositionEmitter from '@/renderer/ipcRenderer/updatePositionEmitter';
import Navigation from '@/renderer/views/OperationBar/Navigation';

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
        <UserInfo></UserInfo>
        <Tools></Tools>
      </div>
    </OperationBarStyles>
  );
};

export default memo(OperationBar);
