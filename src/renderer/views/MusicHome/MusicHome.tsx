import { memo } from 'react';
import { MusicHomeStyles } from '@/renderer/views/MusicHome/styles/MusicHomeStyles';

/**
 * @description: 音乐馆入口
 */
const MusicHome = memo((props) => {
  return (
    <MusicHomeStyles>
      <div className="music-home">home</div>
    </MusicHomeStyles>
  );
});

export default MusicHome;
