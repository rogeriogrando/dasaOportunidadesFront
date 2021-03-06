import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

import signUpEMpresaBackgroundImg from '../../assets/empresas.jpg';

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
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translatex(50px);
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

  animation: ${appearFromRight} 1s;
  form {
    margin-top: 10px;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
      font-weight: 700;
      color: #fff;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }
  > a {
    color: #f4ede8;
    display: flex;
    align-items: center;
    margin-top: 12px;
    text-decoration: none;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#0e58a4')};
    }
    svg {
      border-radius: 50%;
      font-size: 25px;
      background-color: #0e58a4;
      margin-right: 10px;
    }
  }
`;
export const Background = styled.div`
  flex: 1;
  background: url(${signUpEMpresaBackgroundImg}) no-repeat center;
  background-size: cover;
  animation: ${imgOpacity} 1s;
`;
