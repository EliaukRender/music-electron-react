import React, { memo, useState } from 'react';
import { AnalyzeEntryStyles } from '@/renderer/views/PlayerControlBar/styles/AnalyzeEntryStyles';
import DrawerCmp from '@/renderer/components/Drawer/Drawer';
import AnalyzeChart from '@/renderer/views/PlayerControlBar/components/AnalyzeChart';
import AnalyzeColor from '@/renderer/views/PlayerControlBar/components/AnalyzeColor';

/**
 * @description: 频谱
 */
const AnalyzeEntry = () => {
  const [visible, setVisible] = useState(false);

  return (
    <AnalyzeEntryStyles>
      <i
        className="iconfont icon-pinpu"
        style={visible ? {} : {}}
        onClick={() => {
          setVisible(true);
        }}
      ></i>
      {/* 弹窗 */}
      {visible && (
        <DrawerCmp
          drawerVisible={visible}
          closeDrawer={() => setVisible(false)}
        >
          <AnalyzeChart></AnalyzeChart>
          <AnalyzeColor></AnalyzeColor>
        </DrawerCmp>
      )}
    </AnalyzeEntryStyles>
  );
};

export default memo(AnalyzeEntry);
