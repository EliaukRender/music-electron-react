import styled from 'styled-components';

export const LayoutStyles = styled.div`
  min-width: 820px;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgcColor.light_gray};
`;
