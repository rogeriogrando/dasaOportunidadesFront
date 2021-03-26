import { createGlobalStyle } from 'styled-components';
import logoImg from '../assets/background.png';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {

    background: url(${logoImg}) no-repeat center;
    background-color: #161229;
    background-size: cover;


    color: #fff;
    -webkit-font-smoothing: antialiased;
    background-attachment: fixed;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button {
    cursor: pointer;
  }
`;
