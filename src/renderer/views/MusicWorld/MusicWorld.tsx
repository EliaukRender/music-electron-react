import { memo } from 'react';
import { MusicWorldStyles } from '@/renderer/views/MusicWorld/styles/MusicWorldStyles';

/**
 * @description: 音乐视频入口
 */
const MusicWorld = memo((props) => {
  return (
    <MusicWorldStyles>
      <div className="music-world">world</div>
    </MusicWorldStyles>
  );
});

export default MusicWorld;
