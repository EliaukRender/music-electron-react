import { useCallback, useEffect, useRef } from 'react';

/**
 * @description: 阻止元素冒泡
 */
export const useStopPropagation = () => {
  const stopPropagationRef = useRef<HTMLDivElement | HTMLImageElement | null>(
    null,
  );

  const handleClick = useCallback((event: MouseEvent) => {
    const ele = stopPropagationRef.current;
    if (ele) {
      event.stopPropagation();
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    const ele = stopPropagationRef.current;
    // @ts-ignore
    ele && ele.addEventListener('click', handleClick);

    return () => {
      // @ts-ignore
      ele && ele.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return {
    stopPropagationRef,
  };
};
