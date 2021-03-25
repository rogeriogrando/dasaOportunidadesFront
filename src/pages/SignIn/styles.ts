import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center;
  width: 100%;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translatex(-50px);
  }
  to {
    opacity: 1;
    transform: translatex(0px);
  }
`;

const imgOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${appearFromLeft} 1s;
  form {
    margin-top: 10px;
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    h1 {
      margin-bottom: 24px;
      font-weight: 700;
      color: #fff;
    }

    a {
      color: #f4ede8;
      display: flex;
      align-items: center;
      font-weight: bold;
      margin-top: 12px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#0e58a4')};
      }
      svg {
        border-radius: 50%;
        font-size: 25px;
        background-color: #3c91df;
        margin-right: 10px;
      }
    }
  }
`;
