import { memo, useEffect, useRef, useState } from 'react';
import { SheetSongListStyles } from '@/renderer/views/SheetCommon/styles/SheetSongListStyles';
import { shallowEqual, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import SongItemForSheet from '@/renderer/views/components/SongItem/SongItemForSheet';
import NonSong from '@/renderer/views/SheetCommon/components/NonSong';
import classNames from 'classnames';
import { useScrollSongVisible } from '@/renderer/hooks/useScrollSongVisible';

/**
 * @description: 歌单的 歌曲列表
 */
const SheetSongList = memo(() => {
  const { curSheetSongList, activeSongId, activeSheet } = useSelector(
    (state: RootState) => ({
      curSheetSongList: state.mainMenu.curSheetSongList,
      activeSongId: state.playerControl.activeSongId,
      activeSheet: state.mainMenu.activeSheet,
    }),
    shallowEqual,
  );
  const [curTitleId, setCurTitleId] = useState(1);
  const titleList = [
    { id: 1, title: '歌曲' },
    { id: 2, title: '评论' },
  ];
  const { songRefs } = useScrollSongVisible({
    songList: curSheetSongList,
    activeSongId,
  }); // 歌曲滚动到可视区域

  return (
    <SheetSongListStyles>
      {/* 歌曲列表的 可操作区域 */}
      <div className="bar">
        <div className="left">
          {titleList.map((item) => {
            return (
              <div
                className={classNames(
                  'item',
                  item.id === curTitleId ? 'item-active' : '',
                )}
                key={item.id}
                onClick={() => {
                  setCurTitleId(item.id);
                }}
              >
                <span>{item.title}</span>
                {item.id === 1 && <span>({curSheetSongList.length})</span>}
              </div>
            );
          })}
        </div>

        <div className="right">
          <div className="item">
            <i className="iconfont icon-sousuo"></i>
            <span>搜索</span>
          </div>
          <div className="item">
            <i className="iconfont icon-paixu"></i>
            <span>排序</span>
          </div>
        </div>
      </div>

      {/* 歌曲列表 */}
      <div className="song-list">
        {curSheetSongList.length ? (
          curSheetSongList?.map((item: any, index: number) => {
            return (
              <div
                ref={(el) => {
                  songRefs.current[index] = el;
                }}
                key={index}
              >
                <SongItemForSheet
                  songInfo={item}
                  activeSongId={activeSongId}
                  index={index}
                  activeSheet={activeSheet}
                ></SongItemForSheet>
              </div>
            );
          })
        ) : (
          <NonSong></NonSong>
        )}
      </div>
    </SheetSongListStyles>
  );
});

export default SheetSongList;
