import styled from 'styled-components';

export const MenuItemStyles = styled.div`
  .item {
    width: 100%;
    height: 36px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;

    .name {
      margin-left: 10px;
    }

    &:hover {
      background-color: ${({ theme }) => theme.bgcColor.hover};
    }

    .iconfont {
      color: ${({ theme }) => theme.textColor.light};
    }

    &-active {
      background-color: ${({ theme }) => theme.bgcColor.active} !important;
    }
  }

  // 菜单折叠时重置样式
  .item-collapse {
    height: 48px;
    padding-left: 0;
    justify-content: center;

    .iconfont {
      font-size: 26px;
    }
  }
`;
