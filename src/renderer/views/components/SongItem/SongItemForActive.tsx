import React, { memo } from 'react';
import { SongItemForActiveStyles } from '@/renderer/views/components/SongItem/styles/SongItemForActiveStyles';

interface PropsType {
  songInfo: any;
}
/**
 * @description: 播放队列弹窗 的歌曲item
 */
const SongItemForActive = ({ songInfo }: PropsType) => {
  return <SongItemForActiveStyles>SongItemForActive</SongItemForActiveStyles>;
};

export default memo(SongItemForActive);
