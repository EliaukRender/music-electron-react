import { memo } from 'react';
import RemindCmp from '@/renderer/views/components/RemindCmp/RemindCmp';
import { HomeRankStyles } from '@/renderer/views/MusicHome/styles/HomeRankStyles';

/**
 * @description: 音乐馆--排行
 */
const HomeRank = memo((props) => {
  return (
    <HomeRankStyles>
      <RemindCmp></RemindCmp>
    </HomeRankStyles>
  );
});

export default HomeRank;
