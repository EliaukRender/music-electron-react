import React, { memo } from 'react';
import winUiEmitter from '@/renderer/ipcRenderer/mainWindow/winUiEmitter';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

/**
 * @description: 最大化、退出最大化
 */
const MaxScreen = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation();
  const { isMaximize } = useSelector(
    (state: RootState) => ({
      isMaximize: state.global.isMaximize,
    }),
    shallowEqual,
  );

  const maximize = () => {
    winUiEmitter.maximize();
  };

  return (
    <div ref={stopPropagationEleRef} onClick={maximize}>
      <i
        className={classNames(
          'iconfont',
          isMaximize ? 'icon-zuidahua1' : 'icon-zuidahua',
        )}
      ></i>
    </div>
  );
});

export default MaxScreen;
