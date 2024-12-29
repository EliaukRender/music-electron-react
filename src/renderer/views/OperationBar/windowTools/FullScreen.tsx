import { memo } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { setFullScreen } from '@/renderer/store/modules/globalReducer';
import { RootState } from '@/renderer/store';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';

/**
 * @description: APP全屏
 * @param
 * @return
 */
const FullScreen = memo(() => {
  const dispatch = useDispatch();

  const { fullScreen } = useSelector(
    (state: RootState) => ({
      fullScreen: state.global.fullScreen,
    }),
    shallowEqual,
  );

  const handleFullScreen = () => {
    windowUIEmitter.fullApp();
    dispatch(setFullScreen(!fullScreen));
  };

  return (
    <div>
      <i
        title="全屏"
        className={`iconfont icon-${fullScreen ? 'tuichuquanping' : 'quanping'}`}
        onClick={handleFullScreen}
      ></i>
    </div>
  );
});

export default FullScreen;
