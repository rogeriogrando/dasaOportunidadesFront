import styled from 'styled-components';

export const Container = styled.div`
  font-size: 18px;

  background: rgba(0, 0, 0, 0.5);

  img {
    height: 50px;
    width: 50px;
    margin: 0 auto;
    margin-left: 10px;
    margin-right: 10px;
    @media (max-width: 960px) {
      margin-left: -80px;
    }
  }

  nav {
    margin-right: 20px;
    .profile {
      margin-right: 20px;
    }
  }
`;
