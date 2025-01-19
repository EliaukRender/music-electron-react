import styled from 'styled-components';
import { hexToRgba } from '@/renderer/utils/color/transformColor';

export const MenuItemStyles = styled.div`
  .item {
    position: relative;
    width: 100%;
    height: 46px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    cursor: pointer;

    .song-pic {
      width: 28px;
      height: 28px;
      border-radius: 4px;
    }

    .img-mask {
      position: absolute;
      top: 9px;
      left: 9px;
      width: 28px;
      height: 28px;
      background-color: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      z-index: 2;

      .icon-bofang:hover,
      .icon-zanting:hover {
        color: #00cc65 !important;
      }
    }

    .name {
      margin-left: 10px;
    }

    &:hover {
      background-color: ${({ theme }) => hexToRgba(theme.bgcColor.hover, 0.5)};
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
