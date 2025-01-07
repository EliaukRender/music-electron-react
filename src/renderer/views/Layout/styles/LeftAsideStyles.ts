import styled from 'styled-components';

export const LeftAsideStyles = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;

  .menu {
    flex: 1;
    padding: 0 15px 15px 15px;
    overflow-y: auto;

    &::-webkit-scrollbar-thumb {
      background-color: transparent; /* 滑块背景颜色 */
      border-radius: 3px; /* 滑块圆角 */
    }

    &-show-scroll-bar::-webkit-scrollbar-thumb {
      background-color: #e4e4e4; /* 滑块背景颜色 */
      border-radius: 3px; /* 滑块圆角 */
    }
  }

  .bottom-btn-group {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 15px;
  }
`;
