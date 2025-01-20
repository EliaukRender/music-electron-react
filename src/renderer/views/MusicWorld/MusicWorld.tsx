import { memo } from 'react';
import { MusicWorldStyles } from '@/renderer/views/MusicWorld/styles/MusicWorldStyles';
import RemindCmp from '@/renderer/views/components/RemindCmp/RemindCmp';

/**
 * @description: 音乐视频入口
 */
const MusicWorld = memo(() => {
  return (
    <MusicWorldStyles>
      <div className="music-world">
        <RemindCmp></RemindCmp>
      </div>
    </MusicWorldStyles>
  );
});

export default MusicWorld;
