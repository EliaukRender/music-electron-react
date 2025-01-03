import styled from 'styled-components';

export const LyricEntryStyles = styled.div`
  margin-left: 20px;
  cursor: pointer;

  .iconfont.icon-ci-show-lyrics {
    color: ${(props) => props.theme.textColor.gray};
  }
`;
