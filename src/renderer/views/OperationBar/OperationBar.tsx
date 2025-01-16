import React, { memo, useCallback } from 'react';
import { OperationBarStyles } from '@/renderer/views/OperationBar/styles/OperationBarStyles';
import Search from '@/renderer/views/OperationBar/components/Search';
import UserInfo from '@/renderer/views/OperationBar/components/UserInfo';
import Navigation from '@/renderer/views/OperationBar/components/Navigation';
import ChangeTheme from '@/renderer/views/OperationBar/windowTools/ChangeTheme';
import MinScreen from '@/renderer/views/OperationBar/windowTools/MinScreen';
import MaxScreen from '@/renderer/views/OperationBar/windowTools/MaxScreen';
import CloseApp from '@/renderer/views/OperationBar/windowTools/CloseApp';
import { useUpdateWindowPosition } from '@/renderer/hooks/useUpdateWindowPosition';
import { useDoubleClick } from '@/renderer/hooks/useDoubleClick';
import windowUIEmitter from '@/renderer/ipcRenderer/mainWindow/windowUi';
import { setIsMaximize } from '@/renderer/store/modules/globalReducer';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import MiniPlayerEnter from '@/renderer/views/OperationBar/windowTools/MiniPlayerEnter';

/**
 * @description: 顶部操作栏区域
 */
const OperationBar: React.FC = () => {
  const { dragEleRef } = useUpdateWindowPosition({}); // 拖拽窗口
  const { isMaximize } = useSelector(
    (state: RootState) => ({
      isMaximize: state.global.isMaximize,
    }),
    shallowEqual,
  );

  // 双击后最大窗口
  const handleDoubleClick = useCallback(() => {
    windowUIEmitter.maximize();
    setIsMaximize(!isMaximize);
  }, [isMaximize]);
  useDoubleClick(dragEleRef, handleDoubleClick);

  return (
    <OperationBarStyles ref={dragEleRef}>
      <div className="bar-left">
        <Navigation></Navigation>
        <Search></Search>
      </div>
      <div className="bar-right">
        {/* 用户信息 */}
        <UserInfo></UserInfo>
        {/* 主题切换 */}
        <ChangeTheme></ChangeTheme>
        {/* mini播放器 */}
        <MiniPlayerEnter></MiniPlayerEnter>
        {/* 最小化 */}
        <MinScreen></MinScreen>
        {/* 最大化 */}
        <MaxScreen></MaxScreen>
        {/* 关闭App */}
        <CloseApp></CloseApp>
      </div>
    </OperationBarStyles>
  );
};

export default memo(OperationBar);
