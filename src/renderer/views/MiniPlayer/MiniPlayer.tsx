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
import gsap from 'gsap';
import { changeWinHeight } from '@/renderer/ipcRenderer/miniPlayer/miniPlayerEmitter';
import { MiniPlayerEnum } from '@/main/miniPlayer/constant';

interface IMiniPlayerData {
  activeSongId: number;
  activeSongList: any[];
  isPlaying: boolean;
}

/**
 * mini播放器页面
 */
const MiniPlayer = memo(() => {
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

  const onMouseEnter = useCallback((index: number) => {
    gsap.to(`.song-item-${index} .song-item-btn-group`, {
      opacity: 1,
      duration: 0.2,
    });
  }, []);

  const onMouseLeave = useCallback((index: number) => {
    gsap.to(`.song-item-${index} .song-item-btn-group`, {
      opacity: 0,
      duration: 0.2,
    });
  }, []);

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

  /**
   * 打开或折叠歌曲列表面板
   * 操作窗口的目的是为了看到动画效果，并且透明窗口不会阻止桌面鼠标事件
   */
  const [isExpand, setIsExpand] = useState(true); // 歌曲列表是否折叠，初始状态是未折叠
  const showListPanel = useCallback(async () => {
    // 当前是展开状态，先折叠页面，再将窗口变小
    if (isExpand) {
      gsap.to('.bottom-body', {
        height: 0,
        duration: 0.2,
        onComplete: () => {
          changeWinHeight(MiniPlayerEnum.Win_Header_Height);
          setIsExpand(false);
        },
      });
    } else {
      // 当前是折叠状态，先将窗口变大，再将页面展开
      await changeWinHeight(MiniPlayerEnum.Win_Height);
      setIsExpand(true);
      gsap.to('.bottom-body', {
        height: MiniPlayerEnum.Win_Height - MiniPlayerEnum.Win_Header_Height,
        duration: 0.2,
      });
    }
  }, [isExpand]);

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
        <div
          className="header"
          ref={dragEleRef}
          onMouseEnter={() => setIsMouseEnterHeader(true)}
          onMouseLeave={() => setIsMouseEnterHeader(false)}
        >
          <div className="transparent"></div>
          <div className="non-transparent">
            <div className="left">
              <div ref={stopPropagationEleRef}>
                <img className="img-pic" src={activeSong?.songPic} alt="" />
              </div>
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
                  <div onClick={showListPanel}>
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
        </div>
        <div
          className="bottom-body"
          style={{
            height: `${MiniPlayerEnum.Win_Height - MiniPlayerEnum.Win_Header_Height}px`,
          }}
        >
          {/* 播放队列的歌曲列表 */}
          <div className="song-list">
            {activeSongData.activeSongList.map((item, index) => {
              return (
                <div
                  className={`song-item song-item-${index}`}
                  key={item.songId}
                  onMouseEnter={() => onMouseEnter(index)}
                  onMouseLeave={() => onMouseLeave(index)}
                  onBlur={() => onMouseLeave(index)}
                >
                  <div className="name">{item.songName}</div>
                  {/* 操作按钮 */}
                  <div className="song-item-btn-group">
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
      </div>
    </MiniPlayerStyles>
  );
});

export default MiniPlayer;
