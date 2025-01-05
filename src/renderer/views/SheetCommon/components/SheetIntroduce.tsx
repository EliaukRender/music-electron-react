import React, { memo, useCallback } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { SheetIntroduceStyles } from '@/renderer/views/SheetCommon/styles/SheetIntroduceStyles';
import { RootState } from '@/renderer/store';
import { playNextSong } from '@/renderer/store/actions/audioPlayerActions';

/**
 * @description: 歌单信息
 */
const SheetIntroduce = memo(() => {
  const { activeSheet } = useSelector(
    (state: RootState) => ({
      activeSheet: state.mainMenu.activeSheet,
    }),
    shallowEqual,
  );

  const handlePlay = useCallback(() => {
    playNextSong(true); // 播放下一首歌曲
  }, []);

  return (
    <SheetIntroduceStyles>
      <div className="sheet-introduce">
        <img
          className="left-img"
          src={
            activeSheet?.sheetCover ||
            require('@/renderer/assets/images/changpianji.png')
          }
          alt=""
        />
        <div className="right-info">
          <div className="sheet-name-box">
            <div className="sheet-name">{activeSheet?.sheetName}</div>
            <div className="edit-btn">
              <i className="iconfont icon-bianji"></i>
              <span>编辑</span>
            </div>
          </div>
          <div className="intro-text ellipsis">{activeSheet?.sheetInfo}</div>
          <div className="operation">
            <div className="btn" onClick={handlePlay}>
              <i className="iconfont icon-bofang"></i>播放
            </div>
            <div className="btn">
              <i className="iconfont icon-xiazai"></i>下载
            </div>
            <div className="btn">
              <i className="iconfont icon-fenxiang"></i>分享
            </div>
          </div>
        </div>
      </div>
    </SheetIntroduceStyles>
  );
});

export default SheetIntroduce;
