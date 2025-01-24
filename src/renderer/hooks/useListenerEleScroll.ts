import { useCallback, useEffect, useState } from 'react';

/**
 * @description: 计算一个元素的scroll值
 * @param eleRef
 */
export const useListenerEleScroll = (eleRef: any) => {
  const [scrollTop, setScrollTop] = useState(0);

  const getScrollValue = useCallback((e: any) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  useEffect(() => {
    const element = eleRef.current;
    if (element) {
      element.addEventListener('scroll', getScrollValue);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', getScrollValue);
      }
    };
  }, [eleRef, getScrollValue]);

  return {
    scrollTop,
  };
};
