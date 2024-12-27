import OperationBar from '@/renderer/views/OperationBar/OperationBar';
import { RightContainerStyles } from '../styles/RightContainerStyles';
import { useUpdateWindowPosition } from '@/renderer/hooks/useUpdateWindowPosition';
import { useForbidMouseDown } from '@/renderer/hooks/useForbidMouseDown';
import PlayControlBar from '@/renderer/views/PlayerControlBar';

/**
 * @description: APP右侧区域
 */
export default function LeftAside() {
  const { dragEleRef } = useUpdateWindowPosition();
  const { forbidMouseDownEleRef } = useForbidMouseDown();

  return (
    <RightContainerStyles ref={dragEleRef}>
      <div className="container">
        {/* 顶部操作区域 */}
        <OperationBar></OperationBar>
        {/* 中间内容区域 */}
        <div
          ref={forbidMouseDownEleRef}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
          style={{ flex: 1 }}
        ></div>
      </div>
      {/* 音乐播放控制区域 */}
      <PlayControlBar></PlayControlBar>
    </RightContainerStyles>
  );
}
