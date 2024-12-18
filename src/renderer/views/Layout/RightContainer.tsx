import OperationBar from '@/renderer/views/OperationBar/OperationBar';
import { RightContainerStyles } from './styles/RightContainerStyles';

/**
 * @description: APP右侧区域
 */
export default function LeftAside() {
  return (
    <RightContainerStyles>
      <div className="container">
        <OperationBar></OperationBar>
        <div style={{ flex: 1 }}></div>
      </div>
    </RightContainerStyles>
  );
}
