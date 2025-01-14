import styled from 'styled-components';
import { darkenHexColor } from '@/renderer/utils/color/transformColor';

export const MiniPlayerStyles = styled.div`
  .mini-player {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .transparent {
      width: 100%;
      height: 20px;
      background-color: transparent;
    }

    .header {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      height: 70px;
      background-color: #fff;
      border-radius: 6px 6px 0 0;

      .left {
        padding: 0 15px;

        .img-pic {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          transform: translateY(-20px);
        }
      }

      .right {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;

        /* 歌曲信息 */

        .info-text {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .name {
            margin-bottom: 5px;
          }
        }

        /* 操作按钮 */

        .btn-group {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2;
          position: relative;

          .play-pause {
            width: 40px;
            height: 32px;
            border-radius: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #00f268;
          }

          .anticon {
            margin: 0 10px;
            padding: 5px;
            font-size: 26px !important;
            cursor: pointer;

            &:hover {
              color: ${({ theme }) =>
                darkenHexColor(theme.themeColor.active, 10)};
            }

            svg {
              font-size: 24px;
            }
          }

          /* 暂停、播放按钮颜色保持不变 */

          .anticon-pause,
          .anticon-caret-right {
            svg {
              color: #666666 !important;
            }
          }

          .like-img,
          .iconfont.icon-liebiao {
            cursor: pointer;
          }

          .iconfont.icon-guanbi {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
    }

    .song-list {
      width: 100%;
      height: 188px;
      overflow-y: auto;
      border-radius: 0 0 6px 6px;

      &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.bgcColor.light_gray_white};
      }

      .song-item {
        display: flex;
        justify-content: space-between;
        height: 47px;
        line-height: 47px;
        padding: 0 15px;
        background-color: ${({ theme }) => theme.bgcColor.light_gray_white};

        /* 操作按钮 */
        .song-item-btn-group {
          display: flex;
          align-items: center;
          opacity: 0;

          .iconfont.icon-bofang1 {
            margin-right: 10px;
            cursor: pointer;

            &:hover {
              color: ${({ theme }) =>
                darkenHexColor(theme.themeColor.active, 10)};
            }
          }

          .like-img {
            width: 20px;
            cursor: pointer;
          }
        }
      }
    }
  }
`;
