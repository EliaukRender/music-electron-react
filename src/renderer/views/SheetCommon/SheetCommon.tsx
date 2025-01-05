import { memo } from 'react';
import SheetIntroduce from '@/renderer/views/SheetCommon/components/SheetIntroduce';
import { SheetCommonStyles } from '@/renderer/views/SheetCommon/styles/SheetCommonStyles';
import SheetSongList from '@/renderer/views/SheetCommon/components/SheetSongList';

/**
 * @description: 歌单公共页面
 */
const SheetCommon = memo(() => {
  return (
    <SheetCommonStyles>
      <SheetIntroduce></SheetIntroduce>
      <SheetSongList></SheetSongList>
    </SheetCommonStyles>
  );
});

export default SheetCommon;
