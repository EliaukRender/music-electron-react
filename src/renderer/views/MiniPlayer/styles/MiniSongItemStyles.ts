import styled from 'styled-components';
import { darkenHexColor } from '@/renderer/utils/color/transformColor';

export const MiniSongItemStyles = styled.div`
  .song-item {
    display: flex;
    justify-content: space-between;
    height: 47px;
    line-height: 47px;
    padding: 0 15px;
    background-color: ${({ theme }) => theme.bgcColor.light_gray_white};

    .name {
      &-active {
        color: ${({ theme }) => theme.themeColor.hover};
      }
    }

    /* 操作按钮 */
    .song-item-btn-group {
      display: flex;
      align-items: center;
      opacity: 0;

      .iconfont.icon-bofang1 {
        margin-right: 10px;
        cursor: pointer;

        &:hover {
          color: ${({ theme }) => darkenHexColor(theme.themeColor.active, 10)};
        }
      }

      .like-img {
        width: 20px;
        cursor: pointer;
      }
    }
  }
`;
