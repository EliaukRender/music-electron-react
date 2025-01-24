/**
 * @description: 监听元素尺寸的变化
 */
import { useEffect, useState } from 'react';

export const useResizeObserve = (targetRef: any, callBack: () => void) => {
  const [resizeCount, setResizeCount] = useState(0);

  useEffect(() => {
    const targetEle = targetRef.current;

    const resizeObserver = new ResizeObserver(() => {
      if (targetEle) {
        callBack();
        setResizeCount((prevState) => prevState + 1);
      }
    });

    if (targetEle) {
      resizeObserver.observe(targetEle);
    }

    return () => {
      if (targetEle) {
        resizeObserver.unobserve(targetEle);
      }
    };
  }, [callBack, targetRef]);

  return {
    resizeCount, // 告知外部是否resize
  };
};
