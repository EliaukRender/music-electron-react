import { memo, useEffect, useMemo, useState } from 'react';
import { MiniPlayerStyles } from '@/renderer/views/MiniPlayer/MiniPlayerStyles';
import { MiniPlayerEventEnum } from '@/main/miniPlayer/eventEnum/miniPlayerEvent';
import { useUpdateWindowPosition } from '@/renderer/hooks/useUpdateWindowPosition';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

interface IMiniPlayerData {
  activeSongId: number;
  activeSongList: any[];
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
  });

  useEffect(() => {
    window.electron.ipcRenderer.on(
      MiniPlayerEventEnum.Update_Mini_Player_Data,
      (data) => {
        console.log('render-mini-player', data);
        setActiveSongData(data as IMiniPlayerData);
      },
    );
  }, []);

  const activeSong = useMemo(() => {
    return activeSongData.activeSongList.find(
      (item) => item.songId === activeSongData.activeSongId,
    );
  }, [activeSongData.activeSongId, activeSongData.activeSongList]);

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
              <div>控制按钮</div>
            )}
          </div>
        </div>
        <div className="song-list">
          {activeSongData.activeSongList.map((item) => {
            return (
              <div className="song-item" key={item.songId}>
                <div className="name">{item.songName}</div>
              </div>
            );
          })}
        </div>
      </div>
    </MiniPlayerStyles>
  );
});

export default MiniPlayer;
