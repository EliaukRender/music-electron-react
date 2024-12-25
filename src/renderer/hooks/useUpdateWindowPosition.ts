import updatePositionEmitter from '@/renderer/ipcRenderer/updatePositionEmitter';
import { useEffect, useRef } from 'react';

/**
 * @description: 窗口被拖拽时 更新窗口位置信息
 */
export function useUpdateWindowPosition() {
  const dragEleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = dragEleRef.current;
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

  return {
    dragEleRef, // 被拖拽的元素
  };
}
