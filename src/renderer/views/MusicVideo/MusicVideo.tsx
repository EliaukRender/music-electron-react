import { memo } from 'react';
import { MusicVideoStyles } from '@/renderer/views/MusicVideo/styles/MusicVideoStyles';
import RemindCmp from '@/renderer/views/components/RemindCmp/RemindCmp';

/**
 * @description: 音乐视频入口
 */
const MusicVideo = memo((props) => {
  return (
    <MusicVideoStyles>
      <div className="music-video">
        <RemindCmp></RemindCmp>
      </div>
    </MusicVideoStyles>
  );
});

export default MusicVideo;
