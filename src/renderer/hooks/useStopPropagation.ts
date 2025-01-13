import { useCallback, useEffect, useRef } from 'react';

/**
 *   阻止元素 Mousedown事件 、dblclick事件 冒泡
 */
export function useStopPropagation() {
  const stopPropagationEleRef = useRef<HTMLDivElement | null>(null);

  const handler = useCallback((event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  useEffect(() => {
    const element = stopPropagationEleRef.current;
    if (element) {
      element.addEventListener('mousedown', handler);
      element.addEventListener('dblclick', handler);
    }

    return () => {
      if (element) {
        element.removeEventListener('mousedown', handler);
        element.removeEventListener('dblclick', handler);
      }
    };
  }, [handler]);

  return {
    stopPropagationEleRef,
  };
}
