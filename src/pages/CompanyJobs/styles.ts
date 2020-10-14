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
  max-width: 900px;
  margin: 30px auto;
  animation: ${appearFromLeft} 1s;

  h5 {
    text-align: center;
    font-size: 34px;
    margin-bottom: 15px;
  }
  .insertEducation {
    display: flex;
    background-color: #fff;
    height: 70px;
    border-radius: 5px;
    button {
      margin-top: 10px;
      margin-bottom: 10px;
      margin-left: 15px;
    }
  }
  table {
    margin-top: 10px;
    .p-datatable-row .p-datatable .p-datatable-tbody {
      padding: 0;
    }
  }

  .p-datatable .p-datatable-tbody > tr > td {
    text-align: left;
    border: 1px solid #e9ecef;
    border-width: 0 0 1px 0;
    padding: 5px 5px;
  }

  button.button-next {
    display: flex;
    width: 100%;
    margin-top: 15px;
  }

  .p-calendar .p-datepicker {
    min-width: 50%;
  }
`;
