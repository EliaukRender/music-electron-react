import { memo } from 'react';
import { MusicVideoStyles } from '@/renderer/views/MusicVideo/styles/MusicVideoStyles';

/**
 * @description: 音乐视频入口
 */
const MusicVideo = memo((props) => {
  return (
    <MusicVideoStyles>
      <div className="music-video">video</div>
    </MusicVideoStyles>
  );
});

export default MusicVideo;
