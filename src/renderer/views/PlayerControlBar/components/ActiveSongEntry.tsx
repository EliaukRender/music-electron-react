import React, { memo, useCallback, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { ActiveSongEntryStyles } from '@/renderer/views/PlayerControlBar/styles/ActiveSongEntryStyles';
import SongItemForActive from '@/renderer/views/components/SongItem/SongItemForActive';
import DrawerCmp from '@/renderer/components/Drawer/Drawer';
import { darkenHexColor } from '@/renderer/utils/color/transformColor';
import { lightTheme } from '@/renderer/theme/config/lightTheme';
import { useScrollSongVisible } from '@/renderer/hooks/useScrollSongVisible';

interface IProps {
  showLyrics: boolean;
}

/**
 * @description: 当前歌曲播放列表
 */
const ActiveSongEntry = ({ showLyrics }: IProps) => {
  const [visible, setVisible] = useState(false);
  const { activeSongList, activeSongId, activeSheet } = useSelector(
    (state: RootState) => ({
      activeSongList: state.playerControl.activeSongList,
      activeSongId: state.playerControl.activeSongId,
      activeSheet: state.mainMenu.activeSheet,
    }),
    shallowEqual,
  );

  const [isActiveVisible, setIsActiveVisible] = useState(false); // 弹窗完全可见的标志位
  const handleAfterOpenChange = useCallback((flag: boolean) => {
    setIsActiveVisible(flag);
    setTimeout(() => {
      setIsActiveVisible(false); // 还原
    }, 100);
  }, []);
  const { songRefs } = useScrollSongVisible(false, isActiveVisible); // 歌曲滚动到可视区域的hooks

  return (
    <ActiveSongEntryStyles>
      <i
        className={`iconfont icon-zhankai ${showLyrics ? 'icon-zhankai-show-lyrics' : ''}`}
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
      {/* 播放歌曲队列弹窗 */}
      {visible && (
        <DrawerCmp
          drawerVisible={visible}
          closeDrawer={() => setVisible(false)}
          handleAfterOpenChange={handleAfterOpenChange}
        >
          <div className="title">当前播放歌曲列表</div>
          <div className="song-list">
            {activeSongList.map((song: any, index: number) => {
              return (
                <div
                  ref={(el) => {
                    songRefs.current[index] = el;
                  }}
                  key={song.songId}
                >
                  <SongItemForActive
                    songInfo={song}
                    activeSongId={activeSongId}
                    index={index}
                  ></SongItemForActive>
                </div>
              );
            })}
          </div>
        </DrawerCmp>
      )}
    </ActiveSongEntryStyles>
  );
};

export default memo(ActiveSongEntry);
