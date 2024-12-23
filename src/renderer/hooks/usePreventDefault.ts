/**
 * @description: 阻止组件的mousedown
 */
import { useEffect, useRef } from 'react';

export function usePreventDefault() {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = elementRef.current;
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
    elementRef,
  };
}
