import updatePositionEmitter from '@/renderer/ipcRenderer/updatePositionEmitter';
import { useCallback, useEffect, useRef, useState } from 'react';
import store from '@/renderer/store';
import { throttle } from 'lodash';

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
      console.log('useUpdateWindowPosition-鼠标移动');
      e.preventDefault();
      if (!dragging) return;
      const { fullScreen, maxScreen } = store.getState().global;
      if (fullScreen || maxScreen) return;
      const x = e.screenX - clientX;
      const y = e.screenY - clientY;
      updatePositionEmitter.dragApp({ x, y });
    },
    [clientX, clientY, dragging],
  );

  const throttleMove = throttle(handleMouseMove, 10, {
    leading: true,
    trailing: true,
  });

  // 鼠标按下
  const handleMouseDown = useCallback((e: MouseEvent) => {
    console.log('useUpdateWindowPosition-鼠标按下');
    e.preventDefault();
    setDragging((prevState) => true);
    setClientX((prevState) => e.clientX);
    setClientY((prevState) => e.clientY);
  }, []);

  // 鼠标松开
  const handleMouseUp = useCallback(() => {
    console.log('useUpdateWindowPosition-鼠标松开');
    setDragging((prevState) => false);
    setClientX((prevState) => 0);
    setClientY((prevState) => 0);
    document.removeEventListener('mousemove', throttleMove);
  }, [throttleMove]);

  useEffect(() => {
    const element = dragEleRef.current;
    if (element) {
      element.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      dragging && document.addEventListener('mousemove', throttleMove);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', handleMouseDown);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', throttleMove);
      }
    };
  }, [handleMouseDown, throttleMove, handleMouseUp]);

  return {
    dragEleRef, // 被拖拽的元素
  };
}
