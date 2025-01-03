import styled from 'styled-components';

export const VolumeAdjusterStyles = styled.div`
  cursor: pointer;

  .iconfont.icon-volume-1-show-lyrics{
    color: ${(props) => props.theme.textColor.gray};
  }

  .iconfont.icon-volume-1:hover,
  .iconfont.icon-volume-1-active {
    color: ${(props) => props.theme.themeColor.active};
  }
`;
