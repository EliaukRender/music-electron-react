import styled from 'styled-components';

export const NavigateSearchStyles = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  .iconfont {
    font-size: 20px;
    cursor: pointer;
    margin-right: 10px;
  }

  .input {
    min-width: 180px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #ccc;

    &:focus {
      border: 1px solid red;
    }
  }
`;
