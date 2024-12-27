import React, { memo } from 'react';
import { AnalyzeEntryStyles } from '@/renderer/views/PlayerControlBar/styles/AnalyzeEntryStyles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setDrawerVisible } from '@/renderer/store/modules/playerControlReducer';
import DrawerCmp from '@/renderer/components/Drawer/Drawer';
import AnalyzeChart from '@/renderer/views/PlayerControlBar/components/AnalyzeChart';
import AnalyzeColor from '@/renderer/views/PlayerControlBar/components/AnalyzeColor';

/**
 * @description: 频谱
 */
const AnalyzeEntry = () => {
  const dispatch = useDispatch();
  const { drawerVisible } = useSelector(
    (state: RootState) => ({
      drawerVisible: state.playerControl.drawerVisible,
    }),
    shallowEqual,
  );

  return (
    <AnalyzeEntryStyles>
      <i
        className="iconfont icon-pinpu"
        style={drawerVisible ? {} : {}}
        onClick={() => {
          dispatch(setDrawerVisible(true));
        }}
      ></i>
      {/* 弹窗 */}
      <DrawerCmp>
        <AnalyzeChart></AnalyzeChart>
        <AnalyzeColor></AnalyzeColor>
      </DrawerCmp>
    </AnalyzeEntryStyles>
  );
};

export default memo(AnalyzeEntry);
