import styled from 'styled-components';
import { darkenHexColor } from '@/renderer/utils/color/transformColor';

export const OperationBarStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;

  .bar-left {
    display: flex;

    &:first-child {
      margin-right: 5px;
    }

    .iconfont {
      cursor: pointer;
      margin-right: 10px;
    }
  }

  .bar-right {
    display: flex;
    align-items: center;

    &:first-child {
      margin-right: 5px;
    }

    .iconfont {
      margin-left: 10px;

      &:hover {
        /* 降低主题色的亮度 */
        color: ${({ theme }) => darkenHexColor(theme.themeColor.active, 10)};
      }
    }
  }

  .iconfont {
    cursor: pointer;
    font-size: 22px;
  }
`;
