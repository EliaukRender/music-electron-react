import { memo } from 'react';
import { MusicHomeStyles } from '@/renderer/views/MusicHome/styles/MusicHomeStyles';
import RemindCmp from '@/renderer/views/components/RemindCmp/RemindCmp';

/**
 * @description: 音乐馆入口
 */
const MusicHome = memo(() => {
  return (
    <MusicHomeStyles>
      <div className="music-home">
        <RemindCmp></RemindCmp>
      </div>
    </MusicHomeStyles>
  );
});

export default MusicHome;
