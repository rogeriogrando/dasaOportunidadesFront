import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #3c91df;
  height: 45px;
  border-radius: 0px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#3C91DF')};
  }
`;
