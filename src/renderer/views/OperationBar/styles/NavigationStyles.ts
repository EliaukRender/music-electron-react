import styled from 'styled-components';
import { darkenHexColor } from '@/renderer/utils/color/transformColor';

export const NavigateStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .iconfont {
    font-size: 20px;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      /* 降低主题色的亮度 */
      color: ${({ theme }) => darkenHexColor(theme.themeColor.active, 10)};
    }
  }
`;
