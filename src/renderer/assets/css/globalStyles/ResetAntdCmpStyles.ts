import { createGlobalStyle } from 'styled-components';

/**
 * 重置antd组件样式
 */
export const ResetAntdCmpStyles = createGlobalStyle`
  /**
   * Button
  */
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


  /**
   * Divider
  */
  .ant-divider-vertical {
    margin: 0 !important;
  }
  .ant-divider {
    margin: 0 !important;
  }

  /**
   *  Form
  */
  .ant-form-item {
    margin-bottom: 25px;
  }


  /**
   * Select
  */
  .ant-select {
    height: 38px;
    border-radius: 20px;

    .ant-select-selector {
      border-radius: 20px;
      padding: 0 15px !important;

      .ant-select-selection-search-input {
        height: 100% !important;
      }
    }

    .ant-select-arrow {
      margin-right: 5px;
    }
  }

`;
