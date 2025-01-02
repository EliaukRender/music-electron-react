import { useCallback, useEffect } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';
import { setIsMaximize } from '@/renderer/store/modules/globalReducer';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';

/**
 *   鼠标双击 全屏 退出全屏
 */
export const useDoubleClick = (eleRef: any) => {
  const { isMaximize } = useSelector(
    (state: RootState) => ({
      isMaximize: state.global.isMaximize,
    }),
    shallowEqual,
  );
  const handleDoubleClick = useCallback(() => {
    windowUIEmitter.maximize();
    setIsMaximize(!isMaximize);
  }, [isMaximize]);

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
