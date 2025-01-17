// @ts-nocheck
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { MiniPlayerStyles } from '@/renderer/views/MiniPlayer/MiniPlayerStyles';
import { MiniPlayerEventEnum } from '@/main/ipcMain/ipcEventEnum/mini_events';
import { useUpdateWindowPosition } from '@/renderer/hooks/useUpdateWindowPosition';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';
import {
  CaretRightOutlined,
  PauseOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import gsap from 'gsap';
import {
  changeWinHeight,
  likeSong,
  nextPlay,
  pausePlay,
  prePlay,
  startPlay,
} from '@/renderer/ipcRenderer/miniPlayer/miniPlayerEmitter';
import { MiniPlayerEnum } from '@/main/ipcMain/constant';
import windowUiEmitter from '@/renderer/ipcRenderer/mainWindow/windowUi';
import MiniSongItem from '@/renderer/views/MiniPlayer/components/MiniSongItem';
import { IMiniPlayerData } from '@/renderer/types/IMiniPlayer';

/**
 * mini播放器页面
 */
const MiniPlayer = memo(() => {
  const { stopPropagationEleRef } = useStopPropagation(); // 阻止冒泡
  const { dragEleRef } = useUpdateWindowPosition({ isMiniPlayer: true }); // 拖拽
  const [isMouseEnterHeader, setIsMouseEnterHeader] = useState(false);
  const [miniPlayerData, setActiveSongData] = useState<IMiniPlayerData>({
    activeSongId: -1,
    activeSongList: [],
    isPlaying: false,
  });

  // 当前激活的歌曲
  const activeSong = useMemo(() => {
    return miniPlayerData.activeSongList.find(
      (item) => item.songId === miniPlayerData.activeSongId,
    );
  }, [miniPlayerData.activeSongId, miniPlayerData.activeSongList]);

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

  // 隐藏mini-player
  const hiddenMiniPlayer = useCallback(() => {
    windowUiEmitter.showHiddenMiniPlayer();
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
              <div>
                <img
                  ref={stopPropagationEleRef}
                  className="img-pic"
                  src={activeSong?.songPic}
                  alt=""
                />
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
                  <div onClick={() => likeSong(miniPlayerData.activeSongId)}>
                    <img
                      className="like-img"
                      src={require('@/renderer/assets/images/icons/heart.png')}
                      alt=""
                    />
                  </div>
                  {/* 上一首 */}
                  <StepBackwardOutlined onClick={() => prePlay()} />
                  {/* 播放暂停 */}
                  <div className="play-pause">
                    {!miniPlayerData.isPlaying && (
                      <CaretRightOutlined onClick={() => startPlay()} />
                    )}
                    {miniPlayerData.isPlaying && (
                      <PauseOutlined onClick={() => pausePlay()} />
                    )}
                  </div>
                  {/* 下一首 */}
                  <StepForwardOutlined onClick={() => nextPlay()} />
                  {/* 折叠、收起 */}
                  <div onClick={() => showListPanel()}>
                    <i className="iconfont icon-liebiao"></i>
                  </div>
                  {/* 关闭mini-player */}
                  <div>
                    <i
                      className="iconfont icon-guanbi"
                      onClick={() => hiddenMiniPlayer()}
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
            {miniPlayerData.activeSongList.map((item, index) => {
              return (
                <MiniSongItem
                  key={item.songId}
                  index={index}
                  songInfo={item}
                  activeSong={activeSong}
                  miniPlayerData={miniPlayerData}
                ></MiniSongItem>
              );
            })}
          </div>
        </div>
      </div>
    </MiniPlayerStyles>
  );
});

export default MiniPlayer;
