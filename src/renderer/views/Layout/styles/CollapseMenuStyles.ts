import styled from 'styled-components';

export const CollapseMenuStyles = styled.div`
  cursor: pointer;

  .iconfont {
    margin-right: 10px;
  }

  .covert {
    &::before {
      display: inline-block;

      transform: rotateX(180deg);
    }
  }
`;
