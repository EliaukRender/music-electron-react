import React, { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';

/**
 * @description: 最大化、退出最大化
 */
const MaxScreen = memo(() => {
  const { maxScreen } = useSelector(
    (state: RootState) => ({
      maxScreen: state.global.maxScreen,
    }),
    shallowEqual,
  );

  // 窗口最大化、退出最大化
  const handleMaxScreen = async () => {
    windowUIEmitter.maxApp();
  };

  return (
    <div onClick={handleMaxScreen}>
      <i
        className={classNames(
          'iconfont',
          maxScreen ? 'icon-zuidahua1' : 'icon-zuidahua',
        )}
      ></i>
    </div>
  );
});

export default MaxScreen;
