import React, { memo } from 'react';
import windowUIEmitter from '@/renderer/ipcRenderer/rendererInteraction/windowUi';
import classNames from 'classnames';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';

/**
 * @description: 最大化、退出最大化
 */
const MaxScreen = memo(() => {
  const { isMaximize } = useSelector(
    (state: RootState) => ({
      isMaximize: state.global.isMaximize,
    }),
    shallowEqual,
  );

  const maximize = () => {
    windowUIEmitter.maximize();
  };

  return (
    <div onMouseUp={maximize}>
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
