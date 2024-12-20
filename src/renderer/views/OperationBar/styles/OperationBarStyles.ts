import styled from 'styled-components';

export const OperationBarStyles = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 10px 20px;

  .bar-left {
    display: flex;

    &:first-child {
      margin-right: 5px;
    }
  }

  .bar-right {
    display: flex;

    &:first-child {
      margin-right: 5px;
    }
  }
`;
