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
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${appearFromLeft} 2s;
  margin-top: 50px;
  text-align: justify;

  img {
    display: flex;
    flex-direction: column;
    width: 100px;
    height: 100px;
    border-radius: 100px;
    @media (min-width: 500px) {
      width: 130px;
      height: 130px;
      border-radius: 130px;
    }
    @media (min-width: 800px) {
      width: 150px;
      height: 150px;
      border-radius: 150px;
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
      font-size: 1.6rem;
      line-height: 2.6rem;
    }
    @media (min-width: 1300px) {
      margin-left: 5rem;
      margin-right: 5rem;
      font-size: 1.3rem;
      line-height: 1.3rem;
    }
    @media (min-width: 1900px) {
      margin-left: 5rem;
      margin-right: 5rem;
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }

  a {
    font-size: 1.5rem;
    margin-top: 100px;
    margin-bottom: 100px;
  }


`;
