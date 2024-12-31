import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setFullScreen } from '@/renderer/store/modules/globalReducer';
import windowUIEmitter from '@/renderer/ipcRenderer/windowUIEmitter';

interface IProps {
  fullScreen: boolean;
}

/**
 * @description: APP全屏
 * @param
 * @return
 */
const FullScreen = memo(({ fullScreen }: IProps) => {
  const dispatch = useDispatch();

  // 全屏
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
