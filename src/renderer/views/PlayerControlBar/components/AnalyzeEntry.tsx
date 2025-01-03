import React, { memo, useState } from 'react';
import { AnalyzeEntryStyles } from '@/renderer/views/PlayerControlBar/styles/AnalyzeEntryStyles';
import DrawerCmp from '@/renderer/components/Drawer/Drawer';
import AnalyzeChart from '@/renderer/views/PlayerControlBar/components/AnalyzeChart';
import AnalyzeColor from '@/renderer/views/PlayerControlBar/components/AnalyzeColor';
import { darkenHexColor } from '@/renderer/utils/color/transformColor';
import { lightTheme } from '@/renderer/theme/config/lightTheme';

interface IProps {
  showLyrics: boolean;
}
/**
 * @description: 频谱
 */
const AnalyzeEntry = memo(({ showLyrics }: IProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <AnalyzeEntryStyles>
      <i
        className={`iconfont icon-pinpu ${showLyrics ? 'icon-pinpu-show-lyrics' : ''}`}
        style={
          visible
            ? {
                color: darkenHexColor(lightTheme.themeColor.active, 10),
              }
            : {}
        }
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
});

export default AnalyzeEntry;
