import styled from 'styled-components';

export const PlayModeStyles = styled.div`
  /* 歌词全屏时 */
  .iconfont.icon-show-lyrics {
    color: ${(props) => props.theme.textColor.gray};
  }

  /* hover  激活时 */
  .iconfont:hover,
  .iconfont.icon-active {
    color: ${(props) => props.theme.themeColor.active};
  }

  cursor: pointer;
`;
