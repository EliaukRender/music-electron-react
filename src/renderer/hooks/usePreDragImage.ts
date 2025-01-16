import { useEffect } from 'react';

/**
 * 阻止图片的拖拽事件
 */
export function usePreDragImage() {
  useEffect(() => {
    document.querySelectorAll('img')?.forEach((img) => {
      img.addEventListener('dragstart', (event) => {
        event.preventDefault();
      });
    });
  }, []);
}
