import { useCallback, useEffect } from 'react';

/**
 *   ref元素身上的鼠标双击事件
 *
 *   eleRef : 被双击的元素
 *   callBack：元素被双击后执行的回调函数
 */
export const useDoubleClick = (eleRef: any, callBack: () => void) => {
  const handleDoubleClick = useCallback(() => {
    callBack();
  }, [callBack]);

  useEffect(() => {
    const ele = eleRef.current;
    if (ele) {
      ele.addEventListener('dblclick', handleDoubleClick);
    }

    return () => {
      if (ele) {
        ele.removeEventListener('dblclick', handleDoubleClick);
      }
    };
  }, [eleRef, handleDoubleClick]);
};
