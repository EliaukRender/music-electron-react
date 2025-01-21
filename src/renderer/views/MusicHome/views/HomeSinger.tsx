import { memo } from 'react';
import RemindCmp from '@/renderer/views/components/RemindCmp/RemindCmp';
import { HomeSingerStyles } from '@/renderer/views/MusicHome/styles/HomeSingerStyles';

/**
 * @description: 音乐馆--歌手
 */
const HomeSinger = memo(() => {
  return (
    <HomeSingerStyles>
      <RemindCmp></RemindCmp>
    </HomeSingerStyles>
  );
});

export default HomeSinger;
