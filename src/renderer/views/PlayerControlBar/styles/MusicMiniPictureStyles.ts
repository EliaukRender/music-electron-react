import styled from 'styled-components';

export const MusicMiniPictureStyles = styled.div`
  .music-pic-area {
    width: 50px;
    height: 50px;
    position: relative;
    margin-right: 15px;
    cursor: pointer;
    border-radius: 6px;

    .full-screen {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
    }

    .music-pic {
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 6px;
    }
  }
`;
