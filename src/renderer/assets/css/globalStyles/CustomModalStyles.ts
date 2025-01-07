import { createGlobalStyle } from 'styled-components';
import { hexToRgba } from '@/renderer/utils/color/transformColor';

/**
 * 重置antd-Modal组件的样式
 */
export const CustomModalStyles = createGlobalStyle`

  /*  退出app的提示弹窗 */
  .close-app-modal {
    width: 400px !important;
  }


  /*  新增歌单的弹窗 */
  .create-sheet-modal {
    width: 400px !important;

    .content {
      padding: 20px 0;

      .content-item {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 15px;

        .title {
          font-size: 12px;
          margin-bottom: 10px;
        }

        .input-text {
          height: 32px;

          .ant-input {
            font-size: 12px;
          }

          &:hover {
            border-color: ${({ theme }) => theme.themeColor.hover} !important;
            box-shadow: none !important;
          }

          &-focused {
            border-color: ${({ theme }) => theme.themeColor.hover} !important;
            box-shadow: none !important;
          }
        }

        .icon-list {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 5px;
          border-radius: 6px;
          background-color: ${({ theme }) => hexToRgba(theme.bgcColor.light_gray, 0.5)};

          .iconfont {
            margin-bottom: 6px;
            margin-right: 6px;

            &::before {
              padding: 12px 8px;
              cursor: pointer;
              font-size: 25px;
            }

            &:hover {
              background-color: #ebebeb;
              border-radius: 4px;
            }
          }

          .selected {
            color: ${({ theme }) => theme.themeColor.hover} !important;
            border-radius: 4px;
            background-color: ${({ theme }) => hexToRgba(theme.themeColor.hover, 0.1)} !important;
          }
        }

        .desc {
          width: 100%;
        }

      }
    }
  }
`;
