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
    transform: translatey(-10px);
  }
  to {
    opacity: 1;
    transform: translatey(0px);
  }
`;

export const Container = styled.div`
  max-width: 700px;
  margin: 30px auto;
  animation: ${appearFromLeft} 1s;

  h5 {
    text-align: center;
    font-size: 34px;
    margin-bottom: 15px;
  }
  .p-inputgroup {
    size: 100%;
    margin-bottom: 10px;
  }
  .button {
    margin-top: 15px;
    size: 50%;
  }
`;
