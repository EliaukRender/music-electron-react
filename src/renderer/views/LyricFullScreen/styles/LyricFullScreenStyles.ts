import styled from 'styled-components';

export const LyricFullScreenStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: linear-gradient(to top, #484f50 0%, #1d2529 50%, #0f2f41 100%);
  border-radius: 6px;

  position: fixed;
  top: 0;
  left: 0;

  .main-box {
    flex: 1;
    display: flex;
    flex-direction: column;

    .operation-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 80px;
      padding: 0 30px;

      .right {
        display: flex;
        justify-content: space-between;

        .iconfont {
          margin-left: 15px;
        }
      }

      /* 重置原组件的样式 */

      .iconfont,
      svg {
        cursor: pointer;
        color: #ffffff;
      }
    }

    .juke-lyric {
      width: 100%;
      height: 100%;
      flex: 1;
      display: flex;
    }

    .analyze {
      width: 100%;
      height: 160px;
      display: flex;
      justify-content: center;
    }
  }

  .bottom-box {
    background-color: transparent;

    .player-control-bar {
      height: 77px;

      /* 重置原组件的元素样式 */

      .box {
        margin-top: 0;
        background-color: transparent;
      }
    }
  }
`;
