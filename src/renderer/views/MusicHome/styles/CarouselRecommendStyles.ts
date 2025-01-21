import styled from 'styled-components';
import { hexToRgba } from '@/renderer/utils/color/transformColor';

export const CarouselRecommendStyles = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  padding-top: 10px;

  .carouse-recommend {
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      display: none; /* 隐藏滚动条 */
    }

    .sheet-item {
      flex: 0 0 33.33%;
      height: 200px;
      padding-right: 20px;

      &:nth-child(3n) {
        padding-right: 0;
      }

      .image {
        width: 100%;
        height: 100%;
      }
    }
  }

  .next,
  .prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    padding: 10px;
    background-color: ${({ theme }) => hexToRgba(theme.themeColor.hover, 0.5)};
    font-size: 20px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) =>
        hexToRgba(theme.themeColor.hover, 0.8)};
    }
  }

  .next {
    right: 0;
    border-radius: 50% 0 0 50%;
  }

  .prev {
    left: 0;
    border-radius: 0 50% 50% 0;
  }

  .anticon-right {
    transform: translateX(3px);
  }

  .anticon-left {
    transform: translateX(-3px);
  }
`;
