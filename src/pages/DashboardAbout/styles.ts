import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  text-align: justify;
  img {
    display: flex;
    flex-direction: column;
    max-width: 200px;
    max-height: 150px;
    border-radius: 50%;
  }

  span {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin-top: 50px;
    font-size: 20px;
  }

  table {
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin-top: 50px;

    img {
      display: flex;
      flex-direction: column;
      max-width: 150px;
      max-height: 100px;
      border-radius: 50%;
    }
    .p-0 {
      width: 150px;
    }
    .t-d-0 {
      border-radius: 10px;
      background-color: #fff;

      font-size: 20px;
      opacity: 0.9;
      .p-1 {
        color: #000;
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }

  a {
    color: #f4ede8;
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-top: 100px;
    margin-bottom: 100px;
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
`;
