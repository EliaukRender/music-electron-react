import styled from 'styled-components';
import { darkenHexColor } from '@/renderer/utils/color/transformColor';

export const ControlBtnGroupStyles = styled.div`
  .btns {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;

    .play-pause {
      width: 40px;
      height: 32px;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #00f268;
    }

    .anticon {
      margin: 0 10px;
      padding: 5px;
      font-size: 26px !important;
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => darkenHexColor(theme.themeColor.active, 10)};
      }

      svg {
        font-size: 24px;
      }
    }

    /* 暂停、播放按钮颜色保持不变 */
    .anticon-pause,
    .anticon-caret-right {
      svg {
        color: #666666 !important;
      }
    }
  }

  .btns-show-lyric {
    svg {
      color: ${(props) => props.theme.textColor.gray};

      &:hover {
        color: ${(props) => props.theme.themeColor.active};
      }
    }
  }
`;
