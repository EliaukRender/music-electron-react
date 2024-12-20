/**
 * @description: 阻止组件的mousedown
 * @param
 * @return
 */
import { useEffect, useRef } from 'react';

export function usePreventDefault() {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.addEventListener('mousedown', (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
      });
    }

    return () => {
      if (elementRef?.current) {
        elementRef.current.removeEventListener(
          'mousedown',
          (event: MouseEvent) => {
            event.preventDefault();
            event.stopPropagation();
          },
        );
      }
    };
  });

  return {
    elementRef,
  };
}
