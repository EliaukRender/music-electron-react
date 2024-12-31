import updatePositionEmitter from '@/renderer/ipcRenderer/updatePositionEmitter';
import { useCallback, useEffect, useRef, useState } from 'react';
import store from '@/renderer/store';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';

/**
 * @description: 窗口被拖拽时 更新窗口位置信息
 */
export function useUpdateWindowPosition() {
  const dragEleRef = useRef<HTMLDivElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);

  // 鼠标移动
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (!dragging) return;
      const x = e.screenX - clientX;
      const y = e.screenY - clientY;
      updatePositionEmitter.dragApp({ x, y });
    },
    [clientX, clientY, dragging],
  );

  // 鼠标按下
  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    setDragging((prevState) => true);
    setClientX((prevState) => e.clientX);
    setClientY((prevState) => e.clientY);
  }, []);

  // 鼠标松开
  const handleMouseUp = useCallback(() => {
    setDragging((prevState) => false);
    setClientX((prevState) => 0);
    setClientY((prevState) => 0);
    document.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    const element = dragEleRef.current;
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp]);

  return {
    dragEleRef, // 被拖拽的元素
  };
}
