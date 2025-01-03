import styled from 'styled-components';

export const ToolsPopoverStyles = styled.div`
  cursor: pointer;

  .iconfont.icon-shenglve-show-lyrics {
    color: ${(props) => props.theme.textColor.gray};
  }

  .iconfont.icon-shenglve-active {
    color: ${(props) => props.theme.themeColor.active};
  }
`;
