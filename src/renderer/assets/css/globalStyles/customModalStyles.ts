import { createGlobalStyle } from 'styled-components';

export const CustomModalStyles = createGlobalStyle`

  /*  退出app提示弹窗 */
  .close-app-modal {
    width: 400px !important;

    .ant-modal-footer {
      .ant-btn-default {
        &:hover {
          border-color: ${({ theme }) => theme.themeColor.hover};
          color: ${({ theme }) => theme.themeColor.hover};

        }
      }

      .ant-btn-primary {
        background-color: ${({ theme }) => theme.themeColor.hover};

        &:hover {
          background-color: ${({ theme }) => theme.themeColor.active};
        }
      }
    }
  }
`;
