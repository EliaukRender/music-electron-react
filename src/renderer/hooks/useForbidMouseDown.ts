/**
 * @description: 阻止元素的 鼠标mouseDown 事件
 */
import { useEffect, useRef } from 'react';

export function useForbidMouseDown() {
  const forbidMouseDownEleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = forbidMouseDownEleRef.current;
    if (!element) return;
    element.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    });

    return () => {
      element.removeEventListener('mousedown', (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
      });
    };
  });

  return {
    forbidMouseDownEleRef,
  };
}
