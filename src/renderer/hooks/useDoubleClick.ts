import { useCallback, useEffect } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';
import { setMaxScreen } from '@/renderer/store/modules/globalReducer';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';

/**
 *   鼠标双击 全屏 退出全屏
 */
export const useDoubleClick = (eleRef: any) => {
  const { maxScreen } = useSelector(
    (state: RootState) => ({
      maxScreen: state.global.maxScreen,
    }),
    shallowEqual,
  );
  const handleDoubleClick = useCallback(() => {
    windowUIEmitter.maxApp();
    setMaxScreen(!maxScreen);
  }, [maxScreen]);

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
