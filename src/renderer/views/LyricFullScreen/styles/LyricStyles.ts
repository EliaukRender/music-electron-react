import styled from 'styled-components';

export const LyricStyles = styled.div`
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 50px;

  .lyric-box {
    width: 400px;
    height: 360px;
    overflow: auto;
    pointer-events: none; /* 禁止鼠标事件 */
    font-size: 20px;

    &::-webkit-scrollbar {
      display: none;
    }

    /* 每一行歌词的div容器 */

    .lyric-line {
      width: 100%;
      height: 40px;
      line-height: 40px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .lyric-text {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      text-align: left;
      background: #efefef linear-gradient(to right, #00cc65, #00cc65) no-repeat
        0 0;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 0 100%;
    }

    /* 歌词动画 */
    @keyframes scan {
      0% {
        background-size: 0 100%;
      }
      100% {
        background-size: 100% 100%;
      }
    }
  }
`;
