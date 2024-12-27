import React, { memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { ActiveSongEntryStyles } from '@/renderer/views/PlayerControlBar/styles/ActiveSongEntryStyles';
import SongItemForActive from '@/renderer/views/components/SongItem/SongItemForActive';
import DrawerCmp from '@/renderer/components/Drawer/Drawer';
import { setDrawerVisible } from '@/renderer/store/modules/playerControlReducer';

/**
 * @description: 当前歌曲播放列表
 */
const ActiveSongEntry = () => {
  const dispatch = useDispatch();
  const { activeSongList, drawerVisible } = useSelector(
    (state: RootState) => ({
      activeSongList: state.playerControl.activeSongList,
      drawerVisible: state.playerControl.drawerVisible,
    }),
    shallowEqual,
  );

  return (
    <ActiveSongEntryStyles>
      <i
        className="iconfont icon-zhankai"
        style={drawerVisible ? {} : {}}
        onClick={() => {
          dispatch(setDrawerVisible(true));
        }}
      ></i>
      <DrawerCmp>
        <div className="title">当前播放歌曲列表</div>
        <div className="song-list">
          {activeSongList.map((song: any) => {
            return <SongItemForActive songInfo={song}></SongItemForActive>;
          })}
        </div>
      </DrawerCmp>
    </ActiveSongEntryStyles>
  );
};

export default memo(ActiveSongEntry);
