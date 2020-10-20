import styled, { keyframes } from 'styled-components';

const imgOpacity = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translatey(-20px);
  }
  to {
    opacity: 1;
    transform: translatey(0px);
  }
`;

export const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  text-align: justify;
  animation: ${appearFromLeft} 2s;

  h1 {
    text-align: center;
    font-size: 1.2rem;
    margin-top: 2.6rem;

    @media (min-width: 320px) {
      font-size: 1.4rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
    @media (min-width: 500px) {
      font-size: 2.0rem;
    }
    @media (min-width: 780px) {
      font-size: 2.6rem;
    }
  }

  h2 {
    font-size: 1.2rem;
    @media (min-width: 320px) {
      font-size: 1.4rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
    @media (min-width: 500px) {
      font-size: 2.0rem;
    }
    @media (min-width: 780px) {
      font-size: 2.6rem;
    }
  }
  p {
    font-size: 1.2rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 2.0rem;
    margin-left: 1rem;
    margin-right: 1rem;
    @media (min-width: 320px) {
      font-size: 1.0rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }
    @media (min-width: 500px) {
      font-size: 1.2rem;
      margin-left: 2rem;
      margin-right: 2rem;
    }
    @media (min-width: 780px) {
      margin-left: 5rem;
      margin-right: 5rem;
      font-size: 2.0rem;
      line-height: 2.6rem;
    }
  }


`;
