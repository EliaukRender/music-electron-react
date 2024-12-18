import updatePositionEmitter from '@/renderer/ipcRenderer/updatePositionEmitter';
import { useEffect } from 'react';

/**
 * @description: 元素拖拽
 * @param element 被拖拽的元素
 */
export function useDragPosition(element: HTMLDivElement | null) {
  useEffect(() => {
    if (!element) return;
    element.addEventListener('mousedown', handleMouseDown);
    element.addEventListener('mouseup', handleMouseUp);
  });

  let dragging = false;
  let offsetX = 0;
  let offsetY = 0;

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('handleMouseDown', e);
    document.addEventListener('mousemove', handleMouseMove);
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

  const handleMouseUp = () => {
    dragging = false;
    offsetX = 0;
    offsetY = 0;
    document.removeEventListener('mousemove', handleMouseMove);
  };
}
