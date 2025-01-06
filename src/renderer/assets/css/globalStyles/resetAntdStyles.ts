import { createGlobalStyle } from 'styled-components';

/**
 * 重置antd组件样式
 */
export const ResetAntdStyles = createGlobalStyle`
  /*  antd-button  */
  .ant-btn-default {
    &:hover {
      border-color: ${({ theme }) => theme.themeColor.hover} !important;
      color: ${({ theme }) => theme.themeColor.hover} !important;
    }
  }

  .ant-btn-primary {
    background-color: ${({ theme }) => theme.themeColor.hover} !important;

    &:hover {
      background-color: ${({ theme }) => theme.themeColor.active} !important;
    }
  }

`;
