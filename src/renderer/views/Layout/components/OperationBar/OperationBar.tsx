import React, { memo, useEffect, useRef } from 'react';
import { OperationBarStyles } from '@/renderer/views/Layout/components/styles/OperationBarStyles';
import NavigateSearch from '@/renderer/views/Layout/components/OperationBar/NavigateSearch';
import UserInfo from '@/renderer/views/Layout/components/OperationBar/UserInfo';
import Tools from '@/renderer/views/Layout/components/OperationBar/Tools';
import updatePositionEmitter from '@/renderer/ipcRenderer/updatePositionEmitter';
import { throttle } from '@/utils';

/**
 * @description: 顶部操作栏区域
 */
const OperationBar: React.FC = () => {
  const barRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const element = barRef.current;
    if (!element) return;

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('handleMouseDown');
      document.addEventListener('mousemove', thrMove);
      dragging = true;
      offsetX = e.clientX;
      offsetY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      console.log('handleMouseMove', e);
      e.preventDefault();
      e.stopPropagation();
      if (!dragging) return;
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;
      console.log({ x, y });
      updatePositionEmitter.dragApp({ x, y });
    };

    const thrMove = throttle(handleMouseMove, 100, true);

    const handleMouseUp = () => {
      console.log('handleMouseUp');
      dragging = false;
      offsetX = 0;
      offsetY = 0;
      document.removeEventListener('mousemove', handleMouseMove);
    };

    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
  });

  return (
    <OperationBarStyles ref={barRef}>
      <NavigateSearch></NavigateSearch>
      <UserInfo></UserInfo>
      <Tools></Tools>
    </OperationBarStyles>
  );
};

export default memo(OperationBar);
