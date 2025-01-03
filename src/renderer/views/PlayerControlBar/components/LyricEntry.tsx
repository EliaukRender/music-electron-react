import { memo } from 'react';
import { LyricEntryStyles } from '@/renderer/views/PlayerControlBar/styles/LyricEntryStyles';
import { useDispatch } from 'react-redux';
import { setShowLyric } from '@/renderer/store/modules/playerControlReducer';

interface IProps {
  showLyrics: boolean;
}

/**
 * @description: 显示歌词界面的入口
 * @param
 * @return
 */
const LyricEntry = memo(({ showLyrics }: IProps) => {
  const dispatch = useDispatch();

  return (
    <LyricEntryStyles>
      <i
        className={`iconfont icon-ci ${showLyrics ? 'icon-ci-show-lyrics' : ''}`}
        style={showLyrics ? {} : {}}
        onClick={() => {
          dispatch(setShowLyric(!showLyrics));
        }}
      ></i>
    </LyricEntryStyles>
  );
});

export default LyricEntry;
