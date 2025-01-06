import OperationBar from '@/renderer/views/OperationBar/OperationBar';
import { RightContainerStyles } from '../styles/RightContainerStyles';
import PlayControlBar from '@/renderer/views/PlayerControlBar';
import ContentContainer from '@/renderer/views/Layout/components/ContentContainer';
import { useStopPropagation } from '@/renderer/hooks/useStopPropagation';

/**
 * @description: APP右侧区域
 */
export default function LeftAside() {
  const { stopPropagationEleRef } = useStopPropagation();

  return (
    <RightContainerStyles ref={stopPropagationEleRef}>
      <div className="container">
        {/* 顶部操作区域 */}
        <OperationBar></OperationBar>
        {/* 中间内容区域 */}
        <ContentContainer></ContentContainer>
      </div>
      {/* 音乐播放控制区域 */}
      <PlayControlBar></PlayControlBar>
    </RightContainerStyles>
  );
}
