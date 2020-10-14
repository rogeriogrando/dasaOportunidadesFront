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
    transform: translatey(-50px);
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
  margin-left: 10em;
  margin-right: 10em;
  animation: ${appearFromLeft} 2s;

  h1 {
    text-align: center;
    font-size: 35px;
    margin-top: 1em;
  }

  h2 {
    font-size: 30px;
    margin-top: 1em;
  }
  p {
    font-size: 25px;
    margin-top: 1em;
    margin-bottom: 1em;
    line-height: 1.4em;
  }
`;
