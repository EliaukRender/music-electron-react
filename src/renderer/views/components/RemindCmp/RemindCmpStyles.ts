import styled from 'styled-components';

export const RemindCmpStyles = styled.div`
  width: 100%;
  height: 100%;

  .remind-cmp {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .img {
      width: 300px;
    }

    .text {
      color: ${(props) => props.theme.textColor.light};
    }
  }
`;
