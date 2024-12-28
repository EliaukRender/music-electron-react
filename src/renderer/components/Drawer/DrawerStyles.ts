import styled from 'styled-components';

export const DrawerStyles = styled.div`
  .ant-drawer-content-wrapper {
    width: 400px;
    height: calc(100% - 87px - 10px - 10px);
    top: 10px;
    right: 10px;
    border-radius: 12px;
  }

  .ant-drawer-mask {
    background-color: transparent;
  }

  .ant-drawer-content {
    border-radius: 12px 0 0 12px;
  }

  .ant-drawer-body {
    padding: 25px 15px;
    border-radius: 12px 12px 12px 12px;
    overflow: hidden;
    box-sizing: border-box;
  }
`;
