import { memo, useState } from 'react';
import { SheetSongListStyles } from '@/renderer/views/SheetCommon/styles/SheetSongListStyles';
import { useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import SongItemForSheet from '@/renderer/views/components/SongItem/SongItemForSheet';
import NonSong from '@/renderer/views/SheetCommon/components/NonSong';
import classNames from 'classnames';

/**
 * @description: 歌单的 歌曲列表
 */
const SheetSongList = memo(() => {
  const { curSheetSongList } = useSelector((state: RootState) => ({
    curSheetSongList: state.mainMenu.curSheetSongList,
  }));
  const [curTitleId, setCurTitleId] = useState(1);
  const titleList = [
    { id: 1, title: '歌曲' },
    { id: 2, title: '评论' },
  ];

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
              <SongItemForSheet
                songInfo={item}
                index={index}
                key={index}
              ></SongItemForSheet>
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
