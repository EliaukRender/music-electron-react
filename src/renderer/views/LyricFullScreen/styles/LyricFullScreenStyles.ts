import styled from 'styled-components';

export const LyricFullScreenStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: linear-gradient(to top, #484f50 0%, #1d2529 50%, #0f2f41 100%);

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
      flex: 1;
      display: flex;
      align-items: center;
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

      /* 重置原组件的元素样式 */
      .current-music-info {
        .singer {
          color: ${(props) => props.theme.textColor.gray_white};
        }
        .song-name {
          color: ${(props) => props.theme.textColor.gray};
        }
      }

      /* 重置 TimeLine组件 的元素样式 */
      .time-line {
        .time {
          color: ${(props) => props.theme.textColor.gray};
        }
      }

      /* 重置原组件的 svg和iconfont元素 样式 */
      .iconfont,
      svg {
        cursor: pointer;
        color: ${(props) => props.theme.textColor.gray};
      }

      .anticon-pause,
      .anticon-caret-right {
        svg {
          color: #666666;
        }
      }
    }
  }
`;
