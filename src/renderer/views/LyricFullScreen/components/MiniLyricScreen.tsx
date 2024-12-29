import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setShowLyric } from '@/renderer/store/modules/playerControlReducer';

/**
 * @description: 最小化歌词界面
 */
const MiniLyricScreen = memo(() => {
  const dispatch = useDispatch();

  return (
    <div>
      <i
        className="iconfont icon-xiajiantou"
        onClick={() => {
          dispatch(setShowLyric(false));
        }}
      ></i>
    </div>
  );
});

export default MiniLyricScreen;
