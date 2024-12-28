import styled from 'styled-components';

export const MusicInfoStyles = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;

  .img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    z-index: 1;
  }

  .img-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 2;

    .icon-bofang:hover,
    .icon-zanting:hover {
      color: #00cc65 !important;
    }
  }

  .text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-left: 20px;

    .singer {
      font-size: 12px;
      margin-top: 8px;
    }
  }
`;
