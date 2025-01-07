import styled from 'styled-components';

export const ContextMenuStyles = styled.div`
  .context-menu {
    position: fixed;
    z-index: 999;
    background-color: #fff;
    border-radius: 6px;
    padding: 5px 0;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);

    .context-menu-item {
      min-width: 150px;
      height: 34px;
      display: flex;
      align-items: center;
      line-height: 34px;
      padding: 0 15px;
      cursor: pointer;

      .iconfont {
        font-size: 20px;
        margin-right: 10px;
        color: #333333;
      }

      &:hover {
        background-color: ${({ theme }) => theme.bgcColor.hover};
      }

      &-disabled {
        opacity: 0.5;
      }
    }
  }
`;
