import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { MiniPlayerStyles } from '@/renderer/views/MiniPlayer/MiniPlayerStyles';
import { MiniPlayerEventEnum } from '@/main/miniPlayer/eventEnum/miniPlayerEvent';
import { useUpdateWindowPosition } from '@/renderer/hooks/useUpdateWindowPosition';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';
import {
  CaretRightOutlined,
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import { useEleFadeInOut } from '@/renderer/hooks/useEleFadeInOut';

interface IMiniPlayerData {
  activeSongId: number;
  activeSongList: any[];
  isPlaying: boolean;
}

/**
 * mini播放器页面
 */
const MiniPlayer = memo(() => {
  const { fadeInAnimation, fadeOutAnimation, fadeInOutRef } = useEleFadeInOut();
  const { stopPropagationEleRef } = useStopPropagation();
  const { dragEleRef } = useUpdateWindowPosition({ isMiniPlayer: true }); // 拖拽
  const [isMouseEnterHeader, setIsMouseEnterHeader] = useState(false);
  const [activeSongData, setActiveSongData] = useState<IMiniPlayerData>({
    activeSongId: -1,
    activeSongList: [],
    isPlaying: false,
  });

  // 当前激活的歌曲
  const activeSong = useMemo(() => {
    return activeSongData.activeSongList.find(
      (item) => item.songId === activeSongData.activeSongId,
    );
  }, [activeSongData.activeSongId, activeSongData.activeSongList]);

  // 播放歌曲
  const handlePlaySong = useCallback(() => {
    //
  }, []);

  // 暂停歌曲
  const handlePauseSong = useCallback(() => {
    //
  }, []);

  // 上一首
  const handlePreSong = useCallback(() => {
    //
  }, []);

  // 下一首
  const handleNextSong = useCallback(() => {
    //
  }, []);

  // 喜欢
  const handleLikeSong = useCallback(() => {
    //
  }, []);

  // 关闭mini-player
  const handleCloseMiniPlayer = useCallback(() => {
    window.electron.ipcRenderer.sendMessage(
      MiniPlayerEventEnum.Close_Mini_Player,
    );
  }, []);

  useEffect(() => {
    // 监听主线程消息
    window.electron.ipcRenderer.on(
      MiniPlayerEventEnum.Update_Mini_Player_Data,
      (data) => {
        console.log('render-mini-player', data);
        setActiveSongData(data as IMiniPlayerData);
      },
    );
  }, []);

  return (
    <MiniPlayerStyles>
      <div className="mini-player">
        <div className="transparent"></div>
        <div
          className="header"
          ref={dragEleRef}
          onMouseEnter={() => setIsMouseEnterHeader(true)}
          onMouseLeave={() => setIsMouseEnterHeader(false)}
        >
          <div className="left" ref={stopPropagationEleRef}>
            <img className="img-pic" src={activeSong?.songPic} alt="" />
          </div>
          <div className="right">
            {!isMouseEnterHeader ? (
              <div className="info-text">
                <div className="name">{activeSong?.songName}</div>
                <div className="singer">{activeSong?.singer}</div>
              </div>
            ) : (
              <div className="btn-group">
                {/* 喜欢 */}
                <div onClick={() => handleLikeSong}>
                  <img
                    className="like-img"
                    src={require('@/renderer/assets/images/icons/heart.png')}
                    alt=""
                  />
                </div>
                {/* 上一首 */}
                <StepBackwardOutlined onClick={() => handlePreSong} />
                {/* 播放暂停 */}
                <div className="play-pause">
                  {!activeSongData.isPlaying && (
                    <CaretRightOutlined onClick={() => handlePlaySong} />
                  )}
                  {activeSongData.isPlaying && (
                    <PauseOutlined onClick={() => handlePauseSong} />
                  )}
                </div>
                {/* 下一首 */}
                <StepForwardOutlined onClick={() => handleNextSong} />
                {/* 折叠、收起 */}
                <div>
                  <i className="iconfont icon-liebiao"></i>
                </div>
                {/* 关闭mini-player */}
                <div>
                  <i
                    className="iconfont icon-guanbi"
                    onClick={handleCloseMiniPlayer}
                  ></i>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* 播放队列的歌曲列表 */}
        <div className="song-list">
          {activeSongData.activeSongList.map((item) => {
            return (
              <div
                className="song-item"
                key={item.songId}
                onMouseEnter={() => fadeInAnimation()}
                onMouseLeave={() => fadeOutAnimation()}
              >
                <div className="name">{item.songName}</div>
                {/* 操作按钮 */}
                <div className="song-item-btn-group" ref={fadeInOutRef}>
                  <div>
                    <i className="iconfont icon-bofang1"></i>
                  </div>
                  {/* 喜欢 */}
                  <div onClick={() => handleLikeSong}>
                    <img
                      className="like-img"
                      src={require('@/renderer/assets/images/icons/heart.png')}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MiniPlayerStyles>
  );
});

export default MiniPlayer;
