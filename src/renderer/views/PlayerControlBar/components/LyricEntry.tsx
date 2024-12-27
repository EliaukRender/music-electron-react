import { memo } from 'react';
import { LyricEntryStyles } from '@/renderer/views/PlayerControlBar/styles/LyricEntryStyles';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/renderer/store';
import { setShowLyric } from '@/renderer/store/modules/playerControlReducer';

/**
 * @description: 显示歌词界面的入口
 * @param
 * @return
 */
const LyricEntry = memo(() => {
  const dispatch = useDispatch();
  const { showLyrics } = useSelector(
    (state: RootState) => ({
      showLyrics: state.playerControl.showLyrics,
    }),
    shallowEqual,
  );

  return (
    <LyricEntryStyles>
      <i
        className="iconfont icon-ci"
        style={showLyrics ? {} : {}}
        onClick={() => {
          dispatch(setShowLyric(!showLyrics));
        }}
      ></i>
    </LyricEntryStyles>
  );
});

export default LyricEntry;
